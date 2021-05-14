using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.LoggerService;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/parent")]
    [ApiController]
    public class ParentController : Controller
    {
        private IRepositoryWrapper _repository;
        private ILoggerManager _logger;
        private IMapper _mapper;

        public ParentController(IRepositoryWrapper repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{studentid}")]
        public IActionResult GetParentByStudentId(long studentid)
        {
            try
            {
                var parent = _repository.Parent.GetParentByStuedentId(studentid);
                if (parent == null)
                {
                    _logger.LogError($"Parent with student id: {studentid}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned parent with student id: {studentid}");
                    return Ok(parent);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetParentByStudentId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
