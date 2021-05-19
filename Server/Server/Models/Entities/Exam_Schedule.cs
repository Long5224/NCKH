using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("exam_shedule")]
    public class Exam_Schedule
    {
        [Key]
        public long studyTimeId { get; set; }

        public StudyTime StudyTime { get; set; }

        public DateTime day { get; set; }

        public string shift { get; set; }

        public string type { get; set; }

        public string number { get; set; }

        public string room { get; set; }

        public string note { get; set; }
    }
}
