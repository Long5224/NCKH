using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models.Entities;

namespace Server.Models
{
    public class NCKH_DBContext:DbContext
    {
        public NCKH_DBContext(DbContextOptions<NCKH_DBContext> options):base(options)
        {

        }
        public DbSet<Student> Student { get; set; }

        public DbSet<Faculty> Faculty { get; set; }

        public DbSet<Class> Class { get; set; }

        public DbSet<Course> Course { get; set; }

        public DbSet<CourseClass> CourseClass { get; set; }

        public DbSet<Semester> Semester { get; set; }
    }
}
