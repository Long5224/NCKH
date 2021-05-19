using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("semester")]
    public class Semester
    {
        [Key]
        public long id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string begin_year { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string end_year { get; set; }

        public int times { get; set; }

        public ICollection<Course> Courses { get; set; }

    }
}
