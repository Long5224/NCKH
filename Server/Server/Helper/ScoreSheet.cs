using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helper
{
    public class ScoreSheet
    {
        public string name;
        public int amount;

        public ScoreSheet(string name, int amount)
        {
            this.name = name;
            this.amount = amount;
        }
    }
}
