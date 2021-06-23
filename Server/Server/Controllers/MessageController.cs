using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;
using Server.DTO;
using Server.Hubs;
using Server.LoggerService;
using Server.Models;
using Server.Models.Entities;
using Server.Repositories.Imp;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/message")]
    public class MessageController : Controller
    {
        protected readonly IHubContext<MessageHub> _messageHub;

        private IRepositoryWrapper _repository;
        private LinkGenerator _linkGenerator;
        private ILoggerManager _logger;


        public MessageController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger, [NotNull] IHubContext<MessageHub> hubContext)
        {
            _messageHub = hubContext;
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
        }


        [HttpPost, Route("send-message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageDTO newMessage)
        {
            User user = _repository.User.GetUserByUsername(newMessage.senderUsername);
            long senderId = user.id;
            long receiverId = newMessage.receiverId;
            if (user.Role.code == "parent")
            {
                long studentId = Int64.Parse(user.username.Split("-")[1]);
                long classId = _repository.Student.GetStudentById(studentId).classID;
                Teacher teacher = _repository.Teacher.FindByCondition(x => x.classID.Equals(classId)).FirstOrDefault();
                User teacherAccount = _repository.User.GetUserByUsernameId(teacher.id, "teacher");
                receiverId = teacherAccount.id;   
            }
            else
            {
                receiverId = newMessage.receiverId;
            }
            
            Message message = new Message();
            message.sendDate = DateTime.Now;
            message.senderId = senderId;
            message.receiverId = receiverId;
            message.content = newMessage.message;
            _repository.Message.Create(message);
            await _messageHub.Clients.User(receiverId.ToString()).SendAsync("SendMessage", message);
            return Ok(message);
        }
        [HttpGet("username/{userName}")]
        public IActionResult GetMessagesReceivedByUserName(string userName)
        {
            User user = _repository.User.GetUserByUsername(userName);
            if (user.Role.code == "parent")
            {
                var messagesReceived = _repository.Message.GetMessagesByParentId(user.id);
                if (messagesReceived == null)
                {
                    _logger.LogError($"Messages with userName: {userName}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Messages with userName: {userName}");
                    return Ok(messagesReceived);
                }
            }
            else
            {
                var messagesReceived = _repository.Message.GetMessagesByTeacherId(user.id);
                if (messagesReceived == null)
                {
                    _logger.LogError($"Messages with userName: {userName}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Messages with userName: {userName}");
                    return Ok(messagesReceived);
                }
            }
            


        }

        [HttpGet("{id}")]
        public IActionResult GetMessagesByParentId(long id)
        {
            try
            {
                var messagesReceived = _repository.Message.GetMessagesByParentId(id);
                if (messagesReceived == null)
                {
                    _logger.LogError($"Messages with senderId: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Messages with senderId: {id}");
                    return Ok(messagesReceived);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetNotificationById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }
    }


}
