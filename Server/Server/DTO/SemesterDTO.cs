using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class SemesterDTO
    {
        public long id { get; set; }

        public string begin_year { get; set; }

        public string end_year { get; set; }
    }
}
