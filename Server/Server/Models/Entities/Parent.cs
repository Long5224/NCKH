using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("parent")]
    public class Parent
    {
        [Key]
        public long id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public long Studentid { get; set; }

        public Student Student { get; set; }
    }
}
