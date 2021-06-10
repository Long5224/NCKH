using Microsoft.EntityFrameworkCore;
using Server.Helper;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class TeacherRespository : RespositoryBase<Teacher>, ITeacherRespository
    {


        public TeacherRespository(NCKH_DBContext repositoryContext)
           : base(repositoryContext)
        {

        }

        public Teacher GetTeacherById(long teacherId)
        {
            return FindByCondition(tc => tc.id.Equals(teacherId))
                .Include(tc => tc.Class)
                .ThenInclude(cl => cl.Faculty)
                .FirstOrDefault();
        }

        public Teacher GetTeacherByStudentId(long studentId)
        {
            var teacher = RespositoryContext.Teachers
                .FromSqlRaw(@"select teacher.id, teacher.firstName, teacher.lastName, teacher.dateOfBirth, 
                            teacher.placeOfBirth, teacher.gender, teacher.phoneNumber, teacher.yearOfAdmission, teacher.Classid
                            from teacher
                            inner join class on teacher.Classid = class.id
                            inner join student on class.id = student.classID
                            where student.id = {0}", studentId)
                .FirstOrDefault();
            return teacher;
        }
    }
}
