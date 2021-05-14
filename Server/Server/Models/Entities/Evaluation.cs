using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("evaluation")]
    public class Evaluation
    {

        public long Studentid { get; set; }

        public Student Student { get; set; }
      
        public long Semesterid { get; set; }

        public Semester Semester { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string content { get; set; }
    }
}
