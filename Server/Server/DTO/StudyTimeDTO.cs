using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class StudyTimeDTO
    {
        public long id { get; set; }

        public CourseDTO Course { get; set; }
    }
}
