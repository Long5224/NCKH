using Server.Models.Entities;
using Server.Models.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Helper;
namespace Server.Repositories
{
    public interface ICourseClassRespository : IRepositoryBase<CourseClass>
    {
        IEnumerable<CourseClass> GetCourseClasses();
    }
}
