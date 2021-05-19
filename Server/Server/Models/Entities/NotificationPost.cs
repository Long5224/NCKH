using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("notification")]
    public class NotificationPost
    {
        [Key]
        public long id { get; set; }

        public string header { get; set; }

        public string content { get; set; }

        public DateTime created_date { get; set; }

        public long userId { get; set; }
    }
}
