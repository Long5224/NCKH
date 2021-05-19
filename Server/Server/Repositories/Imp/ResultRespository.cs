using Microsoft.EntityFrameworkCore;
using Server.DTO;
using Server.Helper;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class ResultRespository : RespositoryBase<Result>, IResultRespository
    {
        public ResultRespository(NCKH_DBContext repositoryContext)
           : base(repositoryContext)
        {
        }

        public IEnumerable<StudyTimeDTO> GetResultOfSemesterByStudentId(long studentId)
        {
            return null;
        }
    }
}
