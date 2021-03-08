using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Helper;
using Server.Models;

namespace Server.Repositories.Imp
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private NCKH_DBContext _repoContext;
        private IStudentRepository _student;
        private IClassRepository _class;
        private IFacultyRepository _faculty;
        private ISemesterRespository _semester;
        private IDataShaper<Student> _studentDataShaper;
        private IDataShaper<Class> _classDataShaper;
        private IDataShaper<Faculty> _facultyDataShaper;
        public RepositoryWrapper(NCKH_DBContext repositoryContext, IDataShaper<Student> studentDataShaper, IDataShaper<Class> classDataShaper
            ,IDataShaper<Faculty> facultyDataShaper)
        {
            _repoContext = repositoryContext;
            _studentDataShaper = studentDataShaper;
            _classDataShaper = classDataShaper;
            _facultyDataShaper = facultyDataShaper;
        }
        public IStudentRepository Student
        {
            get
            {
                if (_student == null)
                {
                    _student = new StudentRepository(_repoContext, _studentDataShaper);
                }
                return _student;
            }
        }

        public IClassRepository Class
        {
            get
            {
                if(_class == null)
                {
                    _class = new ClassRepository(_repoContext, _classDataShaper);
                }
                return _class;
            }
        }

        public IFacultyRepository Faculty
        {
            get
            {
                if (_faculty == null)
                {
                    _faculty = new FacultyRepository(_repoContext, _facultyDataShaper);
                }
                return _faculty;
            }
        }

        public ISemesterRespository Semester
        {
            get
            {
                if (_semester == null)
                {
                    _semester = new SemesterRespository(_repoContext);
                }
                return _semester;
            }
        }

        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
