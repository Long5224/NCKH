using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Server.Models;
using Server.Models.Entities;

namespace Server.Models
{
    public class Student 
    {
        [Key]
        public long id { get; set; }

        [Column(TypeName ="nvarchar(100)")]
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

        [Column(TypeName ="nvarchar(100)")]
        public string yearOfAdmission { get; set; }

        [ForeignKey("Class")]
        public long classID { get; set; }
        public Class Class { get; set; }

    }
}
