using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;
using Server.Models.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Helper;

namespace Server.Repositories.Imp
{
    public class SemesterRespository : RespositoryBase<Semester> , ISemesterRespository
    {
        public SemesterRespository(NCKH_DBContext repositoryContext)
           : base(repositoryContext)
        {
        }


      
    }
}
