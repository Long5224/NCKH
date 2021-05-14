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
        Student GetStudentById(long studentId);

        IEnumerable<Student> GetStudentsByTeacherId(long teacherId);

        void UpdateSutdent(Student sutdent);

        ShapedEntity GetStudentById(long classId, long studentID, string fields);

        IEnumerable<ShapedEntity> GetStudents(long classId);
    }
}
