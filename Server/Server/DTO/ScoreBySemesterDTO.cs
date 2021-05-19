using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class ScoreBySemesterDTO
    {
        public SemesterDTO firstSemester { get; set; }

        public SemesterDTO secondSemester { get; set; }

        public SemesterDTO totalSemester { get; set; }
    }
}
