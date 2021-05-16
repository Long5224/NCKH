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
            await _notificationHub.Clients.All.SendAsync("sendToReact","The notification: "+ notificationPost.header + " "+notificationPost.content);
            notificationPost.userId = 1;
            NotificationPost notification = new NotificationPost();
            notification.content = notificationPost.content;
            notification.header = notificationPost.header;
            notification.userId = 1;
            _repository.Notification.Create(notification);
            return Ok();
        }
    }
    

}
