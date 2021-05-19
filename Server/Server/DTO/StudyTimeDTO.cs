using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class StudyTimeDTO
    {
        public long semesterId {get; set; }

        public string course { get; set; }

        public ResultDTO results { get; set; }

        public int times { get; set; }

        public StudyTimeDTO(long semesterId, string course, ResultDTO results)
        {
            this.semesterId = semesterId;
            this.course = course;
            this.results = results;
        }
    }
}
