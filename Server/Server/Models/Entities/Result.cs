using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("result")]
    public class Result
    {
      
        [Column(TypeName = "float")]
        public float mark_process { get; set; }

        [Column(TypeName = "float")]
        public float mark_exam { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string evaluation { get; set; }

        [Key]
        public long Studytimeid { get; set; }

        public StudyTime StudyTime { get; set; }

    }
}
