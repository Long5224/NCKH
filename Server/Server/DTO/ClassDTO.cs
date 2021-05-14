using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class ClassDTO
    {
        public long id { get; set; }

        public string name { get; set; }

        public long facultyID { get; set; }

        public FacultyDTO Faculty { get; set; }

    }
}
