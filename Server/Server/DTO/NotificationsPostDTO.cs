using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class NotificationsPostDTO
    {
        public long id { get; set; }

        public string header { get; set; }

        public string content { get; set; }

        public long userId { get; set; }

        public User user { get; set; }
    }
}
