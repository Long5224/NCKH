using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class CourseClassDTO
    {
        public string courseName { get; set; }

        public string courseClassName { get; set; }

        public int day { get; set; }

        public string location { get; set; }

        public CourseClassDTO(string courseName, string courseClassName, string location, int day)
        {
            this.courseName = courseName;
            this.courseClassName = courseClassName;
            this.location = location;
            this.day = day;
        }

        public CourseClassDTO()
        {

        }
    }
}
