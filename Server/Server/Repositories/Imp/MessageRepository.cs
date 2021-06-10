using Server.DTO;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class MessageRepository : RespositoryBase<Message>, IMessageRepository
    {
        public MessageRepository(NCKH_DBContext repositoryContext)
       : base(repositoryContext)
        {
        }

        public MessagesParentDTO GetMessagesByParentId(long parentId)
        {
            List<Message> messages;
            messages = FindByCondition(x => x.senderId.Equals(parentId) || x.receiverId.Equals(parentId)).OrderBy(i => i.sendDate).ToList();
            User parent = RespositoryContext.Users.Where(x => x.id.Equals(parentId)).FirstOrDefault();
            return new MessagesParentDTO(messages, parent);
        }

        public MessagesTeacherDTO GetMessagesByTeacherId(long teacherId)
        {
            List<MessagesParentDTO> messagesReceived = new List<MessagesParentDTO>();
            List<Message> messages;
            List<long> parents = FindByCondition(x => x.receiverId.Equals(teacherId)).GroupBy(x => x.senderId).Select(x => x.Key).ToList();
            foreach (var parentId in parents)
            {
                messages = FindByCondition(x => x.senderId.Equals(parentId) || x.receiverId.Equals(parentId)).OrderBy(i => i.sendDate).ToList();
                User parent = RespositoryContext.Users.Where(x => x.id.Equals(parentId)).FirstOrDefault();
                messagesReceived.Add(new MessagesParentDTO(messages, parent));
            }
            return new MessagesTeacherDTO(messagesReceived);
        }
    }
}
