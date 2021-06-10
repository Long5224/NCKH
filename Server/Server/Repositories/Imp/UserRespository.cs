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
        public string GetUserRole(int id)
        {
            return FindByCondition(us => us.id == id).Include(x => x.Role).FirstOrDefault().Role.code;
        }
       
        public User GetUserByUsername(string username)
        {
            return FindByCondition(us => us.username.Equals(username)).Include(x => x.Role).FirstOrDefault();
        }
        public User GetUserByUsernameId(long id,string role)
        {
            return FindByCondition(us => us.username.EndsWith("-"+id.ToString()) && us.Role.code.Equals(role)).Include(x => x.Role).FirstOrDefault();
        }

        public User GetUserById(long id)
        {
            return FindByCondition(us => us.id.Equals(id)).Include(x => x.Role).FirstOrDefault();
        }
    }
}
