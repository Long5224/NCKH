using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IFacultyRepository : IRepositoryBase<Faculty>
    {
        IEnumerable<ShapedEntity>  GetFaculties();

        ShapedEntity GetFacultyById(long id, string fields);

    }
}
