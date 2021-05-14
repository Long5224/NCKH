using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IEvaluationRespository : IRepositoryBase<Evaluation>
    {
        IEnumerable<Evaluation> GetAllEvaluation(long studentId);

        Evaluation GetEvaluationById(long studentId, long semesterId);

        void UpdateEvaluation(Evaluation evaluation);
    }
}
