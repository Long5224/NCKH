using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class SemesterRespository : RespositoryBase<Semester> , ISemesterRespository
    {
        public SemesterRespository(NCKH_DBContext repositoryContext)
           : base(repositoryContext)
        {
        }

        public IEnumerable<Semester> GetAllSemester()
        {
            var semesters = FindAll().Include(se => se.Courses).ThenInclude(cr => cr.CourseClasses).ToList();

            return semesters;
        }

        public Semester GetSemesterByName(string name)
        {
            return FindByCondition(se => se.name.Equals(name)).FirstOrDefault();
        }
    }
}
