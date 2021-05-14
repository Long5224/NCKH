using AutoMapper;
using Server.DTO;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Student, StudentDTO>();

            CreateMap<Class, ClassDTO>();

            CreateMap<Faculty, FacultyDTO>();

            CreateMap<Student, StudentForUpdateDTO>();

            CreateMap<Evaluation, EvaluationDTO>();

            CreateMap<Result, ResultDTO>();

            CreateMap<Course, CourseDTO>();

            CreateMap<Semester, SemesterDTO>();

            CreateMap<StudyTime, StudyTimeDTO>();

            CreateMap<Teacher, TeacherDTO>();
        }
    }
}
