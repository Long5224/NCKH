﻿using AutoMapper;
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

        public StudentController(IRepositoryWrapper repository, LinkGenerator linkGenerator, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _linkGenerator = linkGenerator;
            _logger = logger;
            _mapper = mapper;
        }


        [HttpGet("{id}")]
        public IActionResult GetStudentById(long id)
        {
            try
            {
                var student = _repository.Student.GetStudentById(id);
                if (student == null)
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned student with id: {id}");
                    var studentResult = _mapper.Map<StudentDTO>(student);
                    return Ok(studentResult);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetStudentById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
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
                var results = _repository.Result.GetResultOfSemesterByStudentId(id);
                if (results == null)
                {
                    _logger.LogError($"Results with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Results with student id: {id}");
                    var Results = _mapper.Map<IEnumerable<ResultDTO>>(results);
                    return Ok(Results);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetScoreByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("{id}/teacher")]
        public IActionResult GetTeacherByStudentId(long id)
        {
            try
            {
                var teacher = _repository.Teacher.GetTeacherByStudentId(id);
                if (teacher == null)
                {
                    _logger.LogError($"Teacher with student id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned teacher with student id: {id}");

                    return Ok(teacher);
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
