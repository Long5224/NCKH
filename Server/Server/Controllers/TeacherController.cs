using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Server.DTO;
using Server.LoggerService;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/teacher")]
    [ApiController]
    public class TeacherController : Controller
    {
        private IRepositoryWrapper _repository;
        private LinkGenerator _linkGenerator;
        private ILoggerManager _logger;
        private IMapper _mapper;

        public TeacherController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public IActionResult GetTeacherById(long id)
        {
            try
            {
                var teacher = _repository.Teacher.GetTeacherById(id);
                if (teacher == null)
                {
                    _logger.LogError($"teacher with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned student with id: {id}");
                    var teacherResult = _mapper.Map<TeacherDTO>(teacher);
                    return Ok(teacherResult);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetTeacherById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("{teacherId}/students")]
        public IActionResult GetStudentsByTeacherId(long teacherId)
        {
            try
            {
                var student = _repository.Student.GetStudentsByTeacherId(teacherId);
                if (student == null)
                {
                    _logger.LogError($"Student with id: {teacherId}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {

                    return Ok(student);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetStudentById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
