using Microsoft.EntityFrameworkCore;
using Server.DTO;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class UserRespository : RespositoryBase<User> , IUserRespository
    {
        public UserRespository(NCKH_DBContext repositoryContext)
       : base(repositoryContext)
        {
        }

        public User GetUser(UserDTO user)
        {
            return FindByCondition(us => us.username.Equals(user.username) && us.password.Equals(user.password))
                .Include(us => us.Role)
                .FirstOrDefault();
        }

        public User GetUserByEmail(string email)
        {
            return FindByCondition(us => us.Email.Equals(email)).FirstOrDefault();
        }

        public User GetUserById(long id)
        {
            List<User> listUsers = FindAll().ToList();

            foreach(User item in listUsers)
            {
                if (item.username.Split("-")[1].Equals(id.ToString()))
                {
                    return item;
                }
            }
            return null;
        }

        public User GetUserByUserName(string userName)
        {
            return FindByCondition(us => us.username.Equals(userName)).Include(us => us.Role).FirstOrDefault();
        }
    }
}
