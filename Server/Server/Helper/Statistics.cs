using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helper
{
    public class Statistics
    {
        public long semesterId { get; set; }
        public string semester { get; set; }
        public List<ScoreSheet> scoresSheet { get; set; }

        public Statistics(long semesterId, string semester, List<ScoreSheet> scoresSheet)
        {
            this.semesterId = semesterId;
            this.semester = semester;
            this.scoresSheet = scoresSheet;
        }
    }
}
