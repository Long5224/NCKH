
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public interface IRepositoryWrapper
    {
        IStudentRepository Student { get; }

        IClassRepository Class { get; }

        IFacultyRepository Faculty { get; }

        ISemesterRespository Semester { get; }

       ICourseClassRespository CourseClass { get; }

       ITeacherRespository Teacher { get; }
        
        IEvaluationRespository Evaluation { get; }

        IResultRespository Result { get; }

        IUserRespository User { get; }

        IParentRespository Parent { get; }
        void Save();
    }
}
