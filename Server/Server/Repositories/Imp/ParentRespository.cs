using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class ParentRespository : RespositoryBase<Parent>, IParentRespository
    {
        public ParentRespository(NCKH_DBContext repositoryContext)
      : base(repositoryContext)
        {
        }

        public Parent GetParentByStuedentId(long studentId)
        {
            return FindByCondition(pa => pa.Studentid.Equals(studentId))
                .Include(pa => pa.Student)
                .ThenInclude(st => st.Class)
                .ThenInclude(cl => cl.Faculty)
                .FirstOrDefault();
        }
    }
}
