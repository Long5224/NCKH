using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class RePassword
    {
        public string userName { get; set; }

        public string oldPassword { get; set; }

        public string newPassword { get; set; }

        public string repeatPassword { get; set; }

        public RePassword(string userName, string oldPassword, string newPassword, string repeatPassword)
        {
            this.userName = userName;
            this.oldPassword = oldPassword;
            this.newPassword = newPassword;
            this.repeatPassword = repeatPassword;
        }
    }
}
