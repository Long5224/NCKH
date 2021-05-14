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
    }
}
