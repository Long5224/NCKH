using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class MessageDTO
    {
        public long id { get; set; }

        public string message { get; set; }

        public string senderUsername { get; set; }

        public long receiverId { get; set; }

        public DateTime sendDate { get; set; }
    }
}
