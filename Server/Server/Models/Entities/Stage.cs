using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("stage")]
    public class Stage
    {
        [Key]
        public long id { get; set; }

        public DateTime begin_time { get; set; }

        public DateTime end_time { get; set; }

        [ForeignKey("courseClassId")]
        public long courseClassId { get; set; }

        public CourseClass CourseClass { get; set; }
    }
}
