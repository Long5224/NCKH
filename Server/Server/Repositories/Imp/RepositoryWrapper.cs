using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Helper;
using Server.Models;
using Server.Models.Entities;

namespace Server.Repositories.Imp
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private NCKH_DBContext _repoContext;
        private IStudentRepository _student;
        private IClassRepository _class;
        private IFacultyRepository _faculty;
        private ISemesterRespository _semester;
        private IParentRespository _parent;
        private IUserRespository _user;
        private ITeacherRespository _teacher;
        private IEvaluationRespository _evaluation;
        private IResultRespository _result;
        private ICourseClassRespository _courseClass;
        private IDataShaper<Student> _studentDataShaper;
        private IDataShaper<Class> _classDataShaper;
        private IDataShaper<Faculty> _facultyDataShaper;
        private IStudyTimeRespository _studyTime;
        private IGeneralRespository _general;
        private INotificationRepository _notificationPost;

        public RepositoryWrapper(NCKH_DBContext repositoryContext, IDataShaper<Student> studentDataShaper, IDataShaper<Class> classDataShaper
            , IDataShaper<Faculty> facultyDataShaper)
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
                if (_class == null)
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

        public ICourseClassRespository CourseClass
        {
            get
            {
                if (_courseClass == null)
                {
                    _courseClass = new CourseClassRespository(_repoContext);
                }
                return _courseClass;
            }
        }

        public ITeacherRespository Teacher
        {
            get
            {
                if (_teacher == null)
                {
                    _teacher = new TeacherRespository(_repoContext);
                }
                return _teacher;
            }
        }

        public IEvaluationRespository Evaluation
        {
            get
            {
                if (_evaluation == null)
                {
                    _evaluation = new EvaluationRespository(_repoContext);
                }
                return _evaluation;
            }
        }

        public IResultRespository Result
        {
            get
            {
                if (_result == null)
                {
                    _result = new ResultRespository(_repoContext);
                }
                return _result;
            }
        }

        public IUserRespository User
        {
            get
            {
                if (_user == null)
                {
                    _user = new UserRespository(_repoContext);
                }
                return _user;
            }
        }

        public IParentRespository Parent
        {
            get
            {
                if (_parent == null)
                {
                    _parent = new ParentRespository(_repoContext);
                }
                return _parent;
            }
        }
        public IStudyTimeRespository StudyTime
        {
            get
            {
                if (_studyTime == null)
                {
                    _studyTime = new StudyTimeRespository(_repoContext);
                }
                return _studyTime;
            }
        }

        public IGeneralRespository General
        {
            get
            {
                if (_general == null)
                {
                    _general = new GeneralRespository(_repoContext);
                }
                return _general;
            }
        }

        public INotificationRepository Notification
        {
            get
            {
                if (_notificationPost == null)
                {
                    _notificationPost = new NotificationRepository(_repoContext);
                }
                return _notificationPost;
            }
        }

        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
