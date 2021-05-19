using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
   [Table("course")]
    public class Course
    {
        [Key]
        public long id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string name { get; set; }

        public int tinchi { get; set; }

        public ICollection<StudyTime> StudyTimes { get; set; }

        [ForeignKey("Semesterid")]
        public long Semesterid { get; set; }

        public Semester Semester { get; set; }



    }
}
