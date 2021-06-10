using EmailService;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.DTO;
using Server.Helper;
using Server.LoggerService;
using Server.Models.Entities;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private ILoggerManager _logger;
        private readonly IWebHostEnvironment _hostEnviroment;
        private readonly IEmailSender _emailSender;


        public AuthController(IRepositoryWrapper repository, ILoggerManager logger, IWebHostEnvironment hostEnvironment, IEmailSender emailSender)
        {
            _repository = repository;
            _logger = logger;
            _hostEnviroment = hostEnvironment;
            _emailSender = emailSender;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] UserDTO user)
        {
            string sb = EncodePassword(user.password);
            UserDTO authen = new UserDTO();
            authen.username = user.username;
            authen.password = sb;

            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            var us = _repository.User.GetUser(authen);
            if (us != null)
            { 
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, us.username),
                    new Claim(ClaimTypes.Role, us.Role.code)
                };

                string tokenString = GenerateToken(claims, 5);
                string imageSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, us.ImageName);
                return Ok(new { Token = tokenString, username = us.username, role = us.Role.code, email = us.Email,  imageSrc = imageSrc});
            }
            else
            {
                return StatusCode(500, "Mật khẩu hoặc tài khoản không chĩnh xác");
            }
        }

        [HttpGet("{username}")] 
        public IActionResult GetUser(string username)
        {
            var user = _repository.User.GetUserByUserName(username);

            if (user == null) {
                return BadRequest("User khong ton tai");

            }
            UserDAO _user = new UserDAO();
            _user.username = user.username;
            _user.role = user.Role.code;
            _user.email = user.Email;
            string imageSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName);
            _user.imageSrc = imageSrc;
            return Ok(_user);
        }

        [HttpPut, Route("repassword")]
        public IActionResult RePassword([FromBody] RePassword rePassword)
        {
            var user = _repository.User.GetUserByUserName(rePassword.userName);
            string oldPassword = EncodePassword(rePassword.oldPassword);
            if (user.password.Equals(oldPassword) == false)
            {
                return StatusCode(500, "Mật khẩu cũ không chính xác");
            }
            user.password = EncodePassword(rePassword.newPassword);
            _repository.User.Update(user);
            _repository.Save();
            return Ok("Đổi mật khẩu thành công");

        }

        [HttpPut, Route("update_avatar")]
        public async Task<ActionResult> UpdateAvatar([FromForm] UploadFile file)
        {
            User _user = _repository.User.GetUserByUserName(file.username);
            string imageName = await SaveImage(file.avatar);
            _user.ImageName = imageName;
            _repository.User.Update(_user);
            _repository.Save();
            string imageSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, _user.ImageName);
            return Ok(imageSrc);
        }

        [HttpPut, Route("email")]
        public IActionResult UpdateEmail(UpdateUser data)
        {
            try
            {
                User _user = _repository.User.GetUserByUserName(data.username);
                MailAddress em = new MailAddress(data.email);
                if(_user == null)
                {
                    return BadRequest("User khong ton tai");
                }
                _user.Email = em.ToString();
                _repository.User.Update(_user);
                _repository.Save();
                return Ok(_user);
            }
            catch (FormatException)
            {
                return BadRequest("Email không hợp lệ");
            }

        }

        [HttpPost, Route("forgot")]
        public IActionResult ForgotPassword(ForgotPasswordModel forgotPasswordModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = _repository.User.GetUserByEmail(forgotPasswordModel.email);
            if (user == null)
                return Ok();

            // Create new token
            string token = GenerateToken(null, 5);

            //create http request with get type and parameters
            //string address = String.Format("http://localhost:5000/api/auth/resetpassword?email={0}&token={1}", user.Email, token);
            string address = String.Format("http://localhost:3000/auth/resetpassword?email={0}", user.Email);
            var message = new Message(new string[] { user.Email }, "Reset password token", address);
            _emailSender.SendEmail(message);
            return Ok();
        }

        [HttpPut, Route("reset")]
        public IActionResult ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            if (!ModelState.IsValid)
                return Ok();
            var user = _repository.User.GetUserByEmail(resetPasswordModel.email);
            if (user == null)
                return BadRequest();
            string newPassword = EncodePassword(resetPasswordModel.password);
            user.password = newPassword;
            _repository.User.Update(user);
            _repository.Save();
            return Ok("Đổi mật khẩu thành công");

        }

        [NonAction]
        private async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnviroment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);

            }
            return imageName;
        }

        [NonAction]
        private string EncodePassword(string password)
        {
            MD5 mh = MD5.Create();
            //Chuyển kiểu chuổi thành kiểu byte
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(password);
            //mã hóa chuỗi đã chuyển
            byte[] hash = mh.ComputeHash(inputBytes);
            //tạo đối tượng StringBuilder (làm việc với kiểu dữ liệu lớn)
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString().ToLower();
        }

        [NonAction]
        private string GenerateToken(List<Claim> claims, int exprires)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                  issuer: "http://localhost:5000",
                  audience: "http://localhost:5000",
                  claims: claims,
                  expires: DateTime.Now.AddMinutes(exprires),
                  signingCredentials: signinCredentials
              );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }
    }

    
}
