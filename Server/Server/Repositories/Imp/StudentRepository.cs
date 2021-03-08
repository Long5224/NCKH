using Microsoft.EntityFrameworkCore;
using Server.Helper;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class StudentRepository : RespositoryBase<Student>, IStudentRepository
    {
        private IDataShaper<Student> _dataShaper;

        public StudentRepository(NCKH_DBContext repositoryContext, IDataShaper<Student> dataShaper)
           : base(repositoryContext)
        {
            _dataShaper = dataShaper;
        }


        public ShapedEntity GetStudentById(long classId, long studentId, string fields)
        {
            var student = FindByCondition(student => student.classID.Equals(classId) && student.id.Equals(studentId))
                .SingleOrDefault();
            return _dataShaper.ShapeData(student, fields);
        }

        public IEnumerable<ShapedEntity> GetStudents(long classId)
        {
            var students = FindByCondition(st => st.classID.Equals(classId));

            IEnumerable<ShapedEntity> shapedStudents = _dataShaper.ShapeData(students, "");

            return shapedStudents;
        }

      
    }
}
