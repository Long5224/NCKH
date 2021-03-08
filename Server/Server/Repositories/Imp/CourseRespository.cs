using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class CourseRespository : RespositoryBase<Course>, ICourseRespository
    {
        public CourseRespository(NCKH_DBContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}
