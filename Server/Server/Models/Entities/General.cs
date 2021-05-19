using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("general")]
    public class General
    {
        [Key]
        public long id { get; set; }

        public int training_point { get; set; }

        public long tuition { get; set; }

        public long scholarship { get; set; }
         
        public string classification { get; set; }

        [ForeignKey("studentId")]
        public long studentId { get; set; }

        public Student Student { get; set; }

        [ForeignKey("semesterId")]
        public long semesterId { get; set; }

        public Semester Semester { get; set; }
    }
}
