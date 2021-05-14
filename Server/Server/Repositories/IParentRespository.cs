using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IParentRespository : IRepositoryBase<Parent>
    {
        Parent GetParentByStuedentId(long studentId);
    }
}
