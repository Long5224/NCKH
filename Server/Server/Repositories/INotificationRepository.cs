using Server.DTO;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface INotificationRepository:IRepositoryBase<NotificationPost>
    {
        NotificationDTO GetNotificationsByUserName(string userName);

        NotificationPost GetNotificationById(long id);
    }
}
