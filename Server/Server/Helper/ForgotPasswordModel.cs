﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helper
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
    }
}
