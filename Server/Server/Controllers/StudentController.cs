using AutoMapper;
using EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [Route("api/students")]
    [ApiController]
    public class StudentController : Controller
    {
        private IRepositoryWrapper _repository;
        private LinkGenerator _linkGenerator;
        private ILoggerManager _logger;
        private IMapper _mapper;
        private IEmailSender _emailSender;

        public StudentController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger, IMapper mapper, IEmailSender emailSender)
        {
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
            _mapper = mapper;
            _emailSender = emailSender;
        }


        [HttpGet("{id}")]
        public IActionResult GetStudentById(long id)
        {
            var student = _repository.Student.GetStudentById(id);
            var imageName = _repository.User.GetUserById(student.id).ImageName;
            string imageSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
            if (student == null)
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned student with id: {id}");
                    var value = _mapper.Map<StudentDTO>(student);
                    return Ok(new {
                        value,
                        imageSrc
                    });
                }

        }
      
        [HttpPut("{id}")]
        public IActionResult UpdateOwner(long id, [FromBody] StudentForUpdateDTO student)
        {
            try
            {
                if (student == null)
                {
                    _logger.LogError("Student object sent from client is null.");
                    return BadRequest("Student object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Student object sent from client.");
                    return BadRequest("Invalid Student object");
                }

                var studentEntity = _repository.Student.GetStudentById(id);
                if (studentEntity == null)
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }

                studentEntity.phoneNumber = student.phoneNumber;
                studentEntity.placeOfBirth = student.placeOfBirth;

                _repository.Student.UpdateSutdent(studentEntity);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateStudent action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("{id}/evaluation")]
        public IActionResult GetEvaluationByStudentId(long id)
        {
            try
            {
                var evaluations = _repository.Evaluation.GetAllEvaluation(id);
                if (evaluations == null)
                {
                    _logger.LogError($"Evaluations with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned evaluations with student id: {id}");
                    var evaluationsResult = _mapper.Map<IEnumerable<EvaluationDTO>>(evaluations);
                    return Ok(evaluationsResult);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEvaluationByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }


        [HttpPut("{id}/evaluation")]
        public IActionResult UpdateEvaluationByStudentId(long id, [FromBody] EvaluationForUpdateDTO evaluation)
        {
            try
            {
                if (evaluation == null)
                {
                    _logger.LogError("Evaluation object sent from client is null.");
                    return BadRequest("Evaluation object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Evaluation object sent from client.");
                    return BadRequest("Invalid Evaluation object");
                }

                var evaluationEntity = _repository.Evaluation.GetEvaluationById(id, evaluation.semesterid);
                if (evaluationEntity == null)
                {
                    _logger.LogError($"Evaluation with id: {id}, hasn't been found in db.");
                    return NotFound();
                }

                evaluationEntity.content = evaluation.content;
                

                _repository.Evaluation.UpdateEvaluation(evaluationEntity);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateEvaluationByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("{id}/score")]
        public IActionResult GetScoreByStudentId(long id)
        {
            try
            {
                var results = _repository.StudyTime.GetResultOfSemesterByStudentId(id).OrderBy(x => x.semesterId);
                if (results == null)
                {
                    _logger.LogError($"Results with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Results with student id: {id}");
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetScoreByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("{id}/averageScore")]
        public IActionResult GetAverageScoreByStudentId(long id)
        {
            try
            {
                var results = _repository.StudyTime.GetResultOfAverageSemesterByStudentId(id);
                if (results == null)
                {
                    _logger.LogError($"Results with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Results with student id: {id}");
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetScoreByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("{id}/study_schedule")]
        public IActionResult GetStudyScheduleByStudentId(long id)
        {
            try
            {
                var results = _repository.StudyTime.GetStudySchedule(id);
                if (results == null)
                {
                    _logger.LogError($"Results with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Results with student id: {id}");
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetTeacherByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }


        }

        [HttpGet("{id}/exam_schedule")]
        public IActionResult GetExamScheduleByStudentId(long id)
        {
            try
            {
                var results = _repository.StudyTime.GetExam_Schedules(id);
                if (results == null)
                {
                    _logger.LogError($"Results with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Results with student id: {id}");
                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetTeacherByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}/general")]
        public IActionResult GetGeneralByStudentId(long id)
        {

            var results = _repository.General.GetGenerals(id);
            if (results == null)
            {
                _logger.LogError($"Results with student id: {id}, hasn't been found in db.");
                return NotFound();
            }
            else
            {
                _logger.LogInfo($"Returned Results with student id: {id}");
                return Ok(results);
            }

        }

        [HttpGet("{id}/teacher")]
        public IActionResult GetTeacherByStudentId(long id)
        {
            try
            {
                var value = _repository.Teacher.GetTeacherByStudentId(id);
                var imageName = _repository.User.GetUserById(value.id).ImageName;
                string imageSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, imageName);
                if (value == null)
                {
                    _logger.LogError($"Teacher with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned teacher with student id: {id}");

                    return Ok(new {
                        value,
                        imageSrc
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetTeacherByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }


    }


}

