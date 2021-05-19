using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class ResultDTO
    {

        public float mark_process { get; set; }

        public float mark_exam { get; set; }

        public string evaluation { get; set; }

    }
}
