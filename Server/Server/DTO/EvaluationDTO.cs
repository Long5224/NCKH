﻿using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTO
{
    public class EvaluationDTO
    {
        public long Studentid { get; set; }

        public long Semesterid { get; set; }

        public Semester Semester { get; set; }

        public string content { get; set; }
    }
}