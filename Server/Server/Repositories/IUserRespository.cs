using Server.DTO;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IUserRespository : IRepositoryBase<User>
    {
        User GetUser(UserDTO user);

        User GetUserByUserName(string userName);
    }
}
