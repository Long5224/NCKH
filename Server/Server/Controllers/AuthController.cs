using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.DTO;
using Server.LoggerService;
using Server.Models.Entities;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
  

        public AuthController(IRepositoryWrapper repository, ILoggerManager logger)
        {
            _repository = repository;
            _logger = logger;
        }

        // GET api/values
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] UserDTO user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            var us = _repository.User.GetUser(user);
            if (us != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, us.username),
                    new Claim(ClaimTypes.Role, us.Role.code)
                };

                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString, username = us.username, role = us.Role.code });
            }
            else
            {
                return StatusCode(500, "Mật khẩu hoặc tài khoản không chĩnh xác");
            }
        }
    }
}
