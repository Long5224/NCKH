using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("lesson")]
    public class Lesson
    {
        [Key]
        public long id { get; set; }

        public int day { get; set; }

        public String shift { get; set; }

        public String location { get; set; }

        [ForeignKey("stageId")]
        public long stageId { get; set; }

        public Stage Stage { get; set; }
    }
}
