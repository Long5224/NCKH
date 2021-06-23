using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class MessagesParentDTO
    {
        public List<Message> messages { get; set; }

        public Message recentMessage { get; set; }

        public User parent { get; set; }

        public MessagesParentDTO(List<Message> messages, User parent)
        {
            this.messages = messages;
            this.parent = parent;
            if (messages != null)
            {
                this.recentMessage = messages.Last();
            }
            this.parent.password = "";
        }
    }
}
