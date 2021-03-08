using Microsoft.EntityFrameworkCore;
using Server.Helper;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class FacultyRepository : RespositoryBase<Faculty>, IFacultyRepository
    {
        private IDataShaper<Faculty> _dataShaper;
        public FacultyRepository(NCKH_DBContext repositoryContext, IDataShaper<Faculty> dataShaper)
           : base(repositoryContext)
        {
            _dataShaper = dataShaper;
        }

        public IEnumerable<ShapedEntity> GetFaculties()
        {
            var faculties = FindAll();

            var shapedFaculties = _dataShaper.ShapeData(faculties, "");

            return shapedFaculties;
        }

        public ShapedEntity GetFacultyById(long id, string fields)
        {
            var faculty = FindByCondition(fa => fa.id.Equals(id)).FirstOrDefault();

            return _dataShaper.ShapeData(faculty, fields);
        }
    }
}
