using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helper
{
    public class ValueScore
    {
        public double totalByTen { get; set; }

        public double totalByFour { get; set; }

        public int tongTinChi { get; set; }

        public ValueScore(double totalByTen, double totalByFour, int tongTinChi)
        {
            this.totalByTen = totalByTen;
            this.totalByFour = totalByFour;
            this.tongTinChi = tongTinChi;
        }

        public ValueScore()
        {
        }
    }
}
