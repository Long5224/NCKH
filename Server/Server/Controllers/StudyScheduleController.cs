using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Server.LoggerService;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/semesters")]
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
        // GET: api/<StudyScheduleController>
        [HttpGet]
        public IActionResult GetAllSemesters()
        {
            try
            {
                var semesters = _repository.Semester.GetAllSemester();
                _logger.LogInfo($"Returned all semester from database.");
               
                return Ok(semesters);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllSemester action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET api/<StudyScheduleController>/5
        [HttpGet("{name}")]
        public string GetSemesterByName(string name)
        {
            return "value";
        }

        // POST api/<StudyScheduleController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StudyScheduleController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StudyScheduleController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
