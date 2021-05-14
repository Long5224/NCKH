using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class EvaluationRespository : RespositoryBase<Evaluation>, IEvaluationRespository
    {
        public EvaluationRespository(NCKH_DBContext repositoryContext)
          : base(repositoryContext)
        {
        }

        public IEnumerable<Evaluation> GetAllEvaluation(long studentId)
        {
            return FindByCondition(el => el.Studentid.Equals(studentId))
                .Include(el => el.Semester)
                .OrderBy(el => el.Semester.begin_year)
                .ToList();
        }

        public Evaluation GetEvaluationById(long studentId, long semesterId)
        {
            return FindByCondition(evl => evl.Studentid.Equals(studentId) && evl.Semesterid.Equals(semesterId))
                .FirstOrDefault();
        }

        public void UpdateEvaluation(Evaluation evaluation)
        {
            Update(evaluation);
        }
    }
}
