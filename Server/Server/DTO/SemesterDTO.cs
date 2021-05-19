using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class SemesterDTO
    {

        public string begin_year { get; set; }

        public string end_year { get; set; }

        public int times { get; set; }

        public double totalByTen { get; set; }

        public double totalByFour { get; set; }

        public int tinchi { get; set; }

        public SemesterDTO(string begin_year, string end_year, int times, double totalByTen, double totalByFour, int tinchi)
        {
            this.begin_year = begin_year;
            this.end_year = end_year;
            this.times = times;
            this.totalByTen = totalByTen;
            this.totalByFour = totalByFour;
            this.tinchi = tinchi;
        }
    }
}
