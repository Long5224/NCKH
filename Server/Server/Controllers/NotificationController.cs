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
    [Route("api/notification")]
    public class NotificationController : Controller
    {
        protected readonly IHubContext<NotificationHub> _notificationHub;

        private IRepositoryWrapper _repository;
        private LinkGenerator _linkGenerator;
        private ILoggerManager _logger;


        public NotificationController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger, [NotNull]IHubContext<NotificationHub> notificationHub)
        {
            _notificationHub = notificationHub;
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
        }


        [HttpPost, Route("post-notification")]
        public async Task<IActionResult> CreateNotification([FromBody] NotificationsPostDTO notificationPost)
        {
            long id = _repository.User.GetUserByUsername(notificationPost.username).id;
            await _notificationHub.Clients.Group(notificationPost.classId.ToString()).SendAsync("Send", "The notification: " + notificationPost.header + " " + notificationPost.content);
            NotificationPost notification = new NotificationPost();
            notification.content = notificationPost.content;
            notification.header = notificationPost.header;
            notification.userId = id; 
            _repository.Notification.Create(notification);
            return Ok();
        }


        [HttpGet("username/{userName}")]
        public IActionResult GetNotificationsByUserName(string userName)
        {

            var notifications = _repository.Notification.GetNotificationsByUserName(userName);
            if (notifications == null)
            {
                _logger.LogError($"Notification with userName: {userName}, hasn't been found in db.");
                return NotFound();
            }
            else
            {
                _logger.LogInfo($"Returned notification with userName: {userName}");
                return Ok(notifications);
            }


        }

        [HttpGet("{id}")]
        public IActionResult GetNotificationById(long id)
        {
            try
            {
                var notifications = _repository.Notification.GetNotificationById(id);
                if (notifications == null)
                {
                    _logger.LogError($"Notification with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned notification with id: {id}");
                    return Ok(notifications);
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
