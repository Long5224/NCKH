using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helper
{
    public class ResetPasswordModel
    { 
        public string password { get; set; }

        public string confirmPassword { get; set; }
        public string email { get; set; }
        //public string Token { get; set; }
    }
}
