using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Repositories
{
    public interface IStudentRepository : IRepositoryBase<Student>
    {

        ShapedEntity GetStudentById(long classId, long studentID, string fields);

        IEnumerable<ShapedEntity> GetStudents(long classId);
    }
}
