using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IClassRepository : IRepositoryBase<Class>
    {
        IEnumerable<ShapedEntity> GetClassesByFaculty(long id);

        ShapedEntity GetClassById(long facultyId, long classId, string fields);
     
    }
}
