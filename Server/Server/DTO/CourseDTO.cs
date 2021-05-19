using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class CourseDTO
    {
        [Key]
        public long id { get; set; }

        public string name { get; set; }

        public SemesterDTO Semester { get; set; }
    }
}
