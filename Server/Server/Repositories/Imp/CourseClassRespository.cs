using Microsoft.EntityFrameworkCore;
using Server.Helper;
using Server.Models;
using Server.Models.Entities;
using Server.Models.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class CourseClassRespository : RespositoryBase<CourseClass>, ICourseClassRespository
    {
        public CourseClassRespository(NCKH_DBContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<CourseClass> GetCourseClasses()
        {
            string maxSemester = RespositoryContext.Semester.ToList().Max(se => se.begin_year);

            return RespositoryContext.CourseClass
                .FromSqlRaw(@"Select course_class.id, course_class.name, course_class.begin_time, course_class.end_time ,
                              course_class.location,course_class.Studytimeid 
                              from course_class 
                              inner join study_time on study_time.id = course_class.Studytimeid
                              inner join course on course.id = study_time.Courseid
                              inner join semester on semester.id = course.Semesterid
                              where semester.begin_year = {0}", maxSemester)
                .Include(cr_cl => cr_cl.StudyTimes)
                .ThenInclude(stt => stt.Course)
                .ThenInclude(c => c.Semester)
                .OrderBy(cr_cl => cr_cl.id);
              
        }
    }
}
