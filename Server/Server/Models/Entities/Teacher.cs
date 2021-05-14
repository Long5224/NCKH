using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Entities
{
    [Table("teacher")]
    public class Teacher
    {

        [Key]
        public long id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string firstName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string lastName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string dateOfBirth { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string placeOfBirth { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string phoneNumber { get; set; }

        [Column(TypeName = "bit")]
        public bool gender { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string yearOfAdmission { get; set; }

        [ForeignKey("Class")]
        public long classID { get; set; }
        public Class Class { get; set; }
    }
}
