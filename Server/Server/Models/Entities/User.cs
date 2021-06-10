using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("user_table")]
    public class User
    {
        public long id { get; set; }

        public string username { get; set; }

        public string password { get; set; }

        public long Roleid { get; set; }

        public Role Role { get; set; }

        public string ImageName { get; set; }

        public string Email { get; set; }
    }
}
