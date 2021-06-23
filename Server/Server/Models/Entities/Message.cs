using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models.Entities
{
    [Table("message")]
    public class Message
    {
        [Key]
        public long id { get; set; }

        public long senderId { get; set; }

        public long receiverId { get; set; }

        public string content { get; set; }

        public DateTime sendDate { get; set; }


    }
}
