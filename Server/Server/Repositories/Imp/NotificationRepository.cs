using Microsoft.EntityFrameworkCore;
using Server.DTO;
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

        public NotificationDTO GetNotificationsByUserName(string userName)
        {
            User user = RespositoryContext.Users.Where(x => x.username.Equals(userName)).Include(us => us.Role).FirstOrDefault();
            List<NotificationPost> notifications;
            long classId;
            if (user.Role.code == "parent")
            {
                long studentId = Int64.Parse(user.username.Split("-")[1]);
                classId = RespositoryContext.Student.Find(studentId).classID;
                Teacher teacher = RespositoryContext.Teachers.Where(x => x.classID.Equals(classId)).FirstOrDefault();

                List<User> userTeachers = RespositoryContext.Users.Where(x => x.Roleid.Equals(2)).ToList();
                foreach (User item in userTeachers)
                {
                    if (item.username.Split("-")[1].Equals(teacher.id.ToString()))
                    {

                        notifications =  FindByCondition(x => x.userId.Equals(item.id)).OrderBy(i => i.id).ToList();
                        return  new NotificationDTO(notifications, classId);
                    }
                }

            }
           
            long teacherId = Int64.Parse(user.username.Split("-")[1]);
            classId = RespositoryContext.Teachers.Find(teacherId).classID;
            notifications = FindByCondition(x => x.userId.Equals(user.id)).OrderBy(i => i.id).ToList();

            return new NotificationDTO(notifications, classId);
        }

        public NotificationPost GetNotificationById(long id)
        {
            return FindByCondition(x => x.id.Equals(id)).FirstOrDefault();
        }

    }
}
