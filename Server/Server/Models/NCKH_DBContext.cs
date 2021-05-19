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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Evaluation>()
                .HasKey(el => new { el.Studentid, el.Semesterid});

          
        }
        public DbSet<Student> Student { get; set; }

        public DbSet<Faculty> Faculty { get; set; }

        public DbSet<Class> Class { get; set; }

        public DbSet<Course> Course { get; set; }

        public DbSet<CourseClass> CourseClass { get; set; }

        public DbSet<Semester> Semester { get; set; }

        public DbSet<StudyTime> StudyTimes { get; set; }

        public DbSet<Result> Results { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Evaluation> Evaluations { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Parent> Parents { get; set; }

        public DbSet<Stage> Stages { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Exam_Schedule> Exam_Schedules { get; set; }

        public DbSet<General> Generals { get; set; }

        public DbSet<NotificationPost> NotificationPosts { get; set; }
    }
}
