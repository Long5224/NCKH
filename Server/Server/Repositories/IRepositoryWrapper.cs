
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

       
        void Save();
    }
}
