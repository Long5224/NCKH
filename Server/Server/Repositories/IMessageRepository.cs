using Server.DTO;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IMessageRepository : IRepositoryBase<Message>
    {
        MessagesParentDTO GetMessagesByParentId(long senderId);
        MessagesTeacherDTO GetMessagesByTeacherId(long receiverId);
    }
}
