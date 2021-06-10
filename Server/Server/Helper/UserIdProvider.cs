using Microsoft.AspNetCore.SignalR;
using Server.Models;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Server.Helper
{
    public class UserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            var id = connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
