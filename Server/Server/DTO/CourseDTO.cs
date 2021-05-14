using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class CourseDTO
    {
        public long id { get; set; }

        public string name { get; set; }


        public SemesterDTO Semester { get; set; }
    }
}
