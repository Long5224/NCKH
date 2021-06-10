using Server.DTO;
using Server.Helper;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IStudyTimeRespository : IRepositoryBase<StudyTime>
    {
        List<StudyTimeDTO> GetResultOfSemesterByStudentId(long studentId);

        List<SemesterDTO> GetResultOfAverageSemesterByStudentId(long studentId);

        Dictionary<string, List<CourseClassDTO>> GetStudySchedule(long studentId);

        List<ExamDTO> GetExam_Schedules(long studentId);

        List<Statistics> GetStatistics(long teacherId);
    }
}
