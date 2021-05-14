using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("role")]
    public class Role
    {
        public long id { get; set; }

        public string name { get; set; }

        public string code { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
