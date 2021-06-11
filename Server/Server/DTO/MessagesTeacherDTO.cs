using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class MessagesTeacherDTO
    {
        public List<MessagesParentDTO> messages { get; set; }

        public MessagesTeacherDTO(List<MessagesParentDTO> messages)
        {
            this.messages = messages;
        }
    }
}
