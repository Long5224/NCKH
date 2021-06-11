using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class NotificationDTO
    {
        public List<NotificationPost> notifications { get; set; }

        public long classId { get; set; }

        public NotificationDTO(List<NotificationPost> notifications, long classId)
        {
            this.notifications = notifications;
            this.classId = classId;
        }
    }
}
