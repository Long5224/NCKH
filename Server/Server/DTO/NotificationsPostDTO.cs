using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class NotificationsPostDTO
    {

        public string header { get; set; }

        public string content { get; set; }

        public string username { get; set; }

        public long classId { get; set; }

    }
}
