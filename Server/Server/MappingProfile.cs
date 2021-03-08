using AutoMapper;
using Server.DTO;
using Server.Models;
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
        }
    }
}
