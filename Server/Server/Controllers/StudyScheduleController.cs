using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using Server.LoggerService;
using Server.Models.Parameters;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/study-schedule")]
    [ApiController]
    public class StudyScheduleController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private LinkGenerator _linkGenerator;
        private ILoggerManager _logger;

        public StudyScheduleController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger)
        {
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
        }


        [HttpGet]
        public IActionResult GetCourseClasses()
        {
            var courseClasses = _repository.CourseClass.GetCourseClasses();

           if(courseClasses == null)
            {
                return NotFound();
            }

            return Ok(courseClasses);
        }

  
    }
}
