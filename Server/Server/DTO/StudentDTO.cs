using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;
using Server.Models;
namespace Server.DTO
{
    public class StudentDTO 

    {
        public long id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string dateOfBirth { get; set; }
        public string placeOfBirth { get; set; }
        public string phoneNumber { get; set; }
        public bool gender { get; set; }
        public string yearOfAdmission { get; set; }
        
    }
}
