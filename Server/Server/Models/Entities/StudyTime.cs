using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("study_time")]
    public class StudyTime
    {
        [Key]
        public long id {get; set;}

        [ForeignKey("Courseid")]
        public long Courseid { get; set; }
        public Course Course { get; set; }

        [ForeignKey("studentId")]
        public long studentId { get; set; }

        public Student Student { get; set; }

        [ForeignKey("semesterId")]
        public long semesterId { get; set; }

        public Semester Semester { get; set; }


    }
}
