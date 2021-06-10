using Microsoft.EntityFrameworkCore;
using Server.DTO;
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

        public Student GetStudentById(long studentId)
        {
            Student student = FindByCondition(st => st.id.Equals(studentId))
                .Include(st => st.Class)
                .ThenInclude(cl => cl.Faculty)
                .OrderBy(st => st.id)
                .FirstOrDefault();
            return student;
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

        public IEnumerable<Student> GetStudentsByTeacherId(long teacherId)
        {
            return RespositoryContext.Student
                .FromSqlRaw(@"select  student.id, student.firstName, student.lastName, student.dateOfBirth, 
                            student.placeOfBirth, student.gender, student.phoneNumber, student.yearOfAdmission, student.classID
                            from student
                            inner join class on class.id = student.classID
                            inner join teacher on teacher.Classid = class.id
                            where teacher.id = {0}", teacherId)
                .OrderBy(st => st.id);
        }

        public void UpdateSutdent(Student student)
        {
            Update(student);
        }
    }
}
