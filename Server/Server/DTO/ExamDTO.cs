using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class ExamDTO
    {
        public string courseClass { get; set; }

        public DateTime day { get; set; }

        public string shift { get; set; }

        public string type { get; set; }

        public string number { get; set; }

        public string room { get; set; }

        public string note { get; set; }

        public ExamDTO(string courseClass, DateTime day, string shift, string type, string number, string room, string note)
        {
            this.courseClass = courseClass;
            this.day = day;
            this.shift = shift;
            this.type = type;
            this.number = number;
            this.room = room;
            this.note = note;
        }
    }
}
