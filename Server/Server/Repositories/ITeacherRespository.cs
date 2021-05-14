﻿using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface ITeacherRespository : IRepositoryBase<Teacher>
    {
        IEnumerable<Teacher>  GetTeacherByStudentId(long studentId);

        Teacher GetTeacherById(long teacherId);
    }
}