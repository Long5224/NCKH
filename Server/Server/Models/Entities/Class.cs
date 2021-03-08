using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Class
    {
        [Key]
        public long id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string name { get; set; }

        public ICollection<Student> Students { get; set; }

        [ForeignKey("Faculty")]
        public long facultyID { get; set; }

        public Faculty Faculty { get; set; }


    }
}
