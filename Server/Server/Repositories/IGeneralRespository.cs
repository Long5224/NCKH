﻿using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IGeneralRespository : IRepositoryBase<General>
    {
        List<General> GetGenerals(long studentId);
    }
}
