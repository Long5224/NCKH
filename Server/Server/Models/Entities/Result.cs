using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    public class Result
    {
        public long id { get; set; }

        public float score_progress { get; set; }

        public float score_exam { get; set; }

        public string evaluation { get; set; }

        public int result_times { get; set; }

        public long studentId { get; set; }

        public Student Student { get; set; }
    }
}
