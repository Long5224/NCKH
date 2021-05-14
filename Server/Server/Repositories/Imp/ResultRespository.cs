using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<Result> GetResultOfSemesterByStudentId(long studentId)
        {
            return FindByCondition(rs => rs.Studentid.Equals(studentId))
                .Include(rs => rs.StudyTime)
                .ThenInclude(stt => stt.Course)
                .ThenInclude(cr => cr.Semester)
                .OrderByDescending(re => re.StudyTime.Course.Semester.begin_year);
        }
    }
}
