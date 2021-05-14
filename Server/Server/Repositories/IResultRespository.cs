using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IResultRespository : IRepositoryBase<Result>
    {
        IEnumerable<Result>  GetResultOfSemesterByStudentId(long studentId);
    }
}
