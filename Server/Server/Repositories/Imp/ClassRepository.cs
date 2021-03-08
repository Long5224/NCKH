using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.DTO;
using Server.Helper;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class ClassRepository : RespositoryBase<Class>, IClassRepository
    {
        private IDataShaper<Class> _dataShaper;

        public ClassRepository(NCKH_DBContext repositoryContext, IDataShaper<Class> dataShaper)
          : base(repositoryContext)
        {
            
            _dataShaper = dataShaper;

        }

        public ShapedEntity GetClassById(long facultyId, long classId, string fields)
        {
            var cl = FindByCondition(cl => cl.facultyID.Equals(facultyId) && cl.id.Equals(classId)).FirstOrDefault();

            return _dataShaper.ShapeData(cl, fields);
        }

        public IEnumerable<ShapedEntity> GetClassesByFaculty(long id)
        {
            var classes = FindByCondition(cl => cl.facultyID.Equals(id));

            var shapedClasses = _dataShaper.ShapeData(classes, "");

            return shapedClasses;
        }
    }
}
