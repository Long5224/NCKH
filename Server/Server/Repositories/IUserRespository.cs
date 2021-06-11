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

        User GetUserById(long id);

        User GetUserByEmail(string email);

        string GetUserRole(int id);

        User GetUserByUsernameId(long id, string role);

        User GetUserByUsername(string username);
    }
}
