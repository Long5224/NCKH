using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Server.LoggerService;
using Server.Models;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/faculties")]
    [ApiController]
    [Authorize(Roles = "student, parents    , teacher")]
    public class FacultyController : Controller
    {
        private IRepositoryWrapper _repository;
        private LinkGenerator _linkGenerator;
        private ILoggerManager _logger;

        public FacultyController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger)
        {
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetFaculties()
        {
            var faculties = _repository.Faculty.GetFaculties();

            _logger.LogInfo($"Returned {faculties.ToList().Count} faculties from database.");

            var shapedFaculties = faculties.Select(o => o.Entity).ToList();

            for (var index = 0; index < faculties.Count(); index++)
            {
                var classLinks = CreateLinksForFaculty(faculties.ToList()[index].id, "");
                shapedFaculties[index].Add("Links", classLinks);
            }

            var facultiesWrapper = new LinkCollectionWrapper<Entity>(shapedFaculties);

            return Ok(CreateLinksForFaculties(facultiesWrapper));
        }


        [HttpGet("{facultyId}")]
        public IActionResult GetFacultyById(long facultyId, [FromQuery] string fields)
        {
            var faculty = _repository.Faculty.GetFacultyById(facultyId, fields);

            if (faculty == null)
            {
                return NotFound();
            }

            faculty.Entity.Add("Links", CreateLinksForFaculty(faculty.id, fields));

            return Ok(faculty.Entity);
        }


        [HttpGet("{facultyId}/classes")]
        public IActionResult GetClassesByFaculty(long facultyId)
        {
            var classes = _repository.Class.GetClassesByFaculty(facultyId);

            _logger.LogInfo($"Returned {classes.ToList().Count} classes from database.");

            var shapedClasses = classes.Select(o => o.Entity).ToList();

            for (var index = 0; index < classes.Count(); index++)
            {
                var classLinks = CreateLinksForClass(facultyId, classes.ToList()[index].id, "");
                shapedClasses[index].Add("Links", classLinks);
            }

            var classesWrapper = new LinkCollectionWrapper<Entity>(shapedClasses);

            return Ok(CreateLinksForClasses(classesWrapper));
        }

        [HttpGet("{facultyId}/classes/{classId}", Name = "ClassById")]
        public IActionResult GetClassById(long facultyId, long classId, [FromQuery] string fields)
        {
            var cl = _repository.Class.GetClassById(facultyId, classId, fields);

            if (cl == null)
            {
                return NotFound();
            }

            cl.Entity.Add("Links", CreateLinksForClass(facultyId, cl.id, fields));

            return Ok(cl.Entity);
        }

        [HttpGet("{facultyId}/classes/{classId}/students")]
        public IActionResult GetStudentsByClass(long facultyId, long classId)
        {
            var students = _repository.Student.GetStudents(classId);


            var shapedStudents = students.Select(o => o.Entity).ToList();

            for (var index = 0; index < students.Count(); index++)
            {
                var studentLinks = CreateLinksForStudent(facultyId, classId, students.ToList()[index].id, "");
                shapedStudents[index].Add("Links", studentLinks);
            }

            var studentsWrapper = new LinkCollectionWrapper<Entity>(shapedStudents);

            return Ok(CreateLinksForStudents(studentsWrapper));
        }

        [HttpGet("{facultyId}/classes/{classId}/students/{id}")]
        public IActionResult GetStudentById(long facultyId, long classId, long id, [FromQuery] string fields)
        {
            var student = _repository.Student.GetStudentById(classId, id, fields);
            if (student == null)
            {
                _logger.LogError($"Account with id: {id}, hasn't been found in db.");
                return NotFound();
            }

            student.Entity.Add("Links", CreateLinksForStudent(facultyId, classId, student.id, fields));

            return Ok(student.Entity);

        }

        private List<Link> CreateLinksForStudent(long facultyId, long classId, long id, string fields = "")
        {
            var links = new List<Link>
            {
                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetStudentById), values: new {facultyId, classId, id, fields }),
                "self",
                "GET"),
            };

            return links;
        }

        private LinkCollectionWrapper<Entity> CreateLinksForStudents(LinkCollectionWrapper<Entity> studentsWrapper)
        {
            studentsWrapper.Links.Add(new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetStudentsByClass), values: new { }),
                    "self",
                    "GET"));

            return studentsWrapper;
        }


        private IEnumerable<Link> CreateLinksForClass(long facultyId, long classId, string fields = "")
        {

            var links = new List<Link>
            {
                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetClassById), values: new {facultyId, classId, fields }),
                "self",
                "GET"),

                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetStudentsByClass), values: new {facultyId, classId, fields }),
                "students",
                "GET"),

            };

            return links;
        }

        private LinkCollectionWrapper<Entity> CreateLinksForClasses(LinkCollectionWrapper<Entity> classesWrapper)
        {
            classesWrapper.Links.Add(new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetClassesByFaculty), values: new { }),
                    "self",
                    "GET"));

            return classesWrapper;
        }


        private IEnumerable<Link> CreateLinksForFaculty(long facultyId, string fields = "")
        {

            var links = new List<Link>
            {
                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetFacultyById), values: new { facultyId, fields }),
                "self",
                "GET"),
                new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetClassesByFaculty), values: new { facultyId, fields }),
                "classes",
                "GET"),

            };

            return links;
        }

        private LinkCollectionWrapper<Entity> CreateLinksForFaculties(LinkCollectionWrapper<Entity> facultiesWrapper)
        {
            facultiesWrapper.Links.Add(new Link(_linkGenerator.GetUriByAction(HttpContext, nameof(GetFaculties), values: new { }),
                    "self",
                    "GET"));

            return facultiesWrapper;
        }
    }
}
