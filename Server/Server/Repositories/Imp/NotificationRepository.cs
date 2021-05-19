using Microsoft.EntityFrameworkCore;
using Server.Helper;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class NotificationRepository : RespositoryBase<NotificationPost>, INotificationRepository
    {
        public NotificationRepository(NCKH_DBContext repositoryContext)
       : base(repositoryContext)
        {
        }

    }
}
