using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface ISemesterRespository : IRepositoryBase<Semester>
    {
        IEnumerable<Semester> GetAllSemester();

        Semester GetSemesterByName(string name);
    }
}
