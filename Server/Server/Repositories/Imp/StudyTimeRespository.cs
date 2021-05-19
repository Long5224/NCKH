using Server.DTO;
using Server.Helper;
using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class StudyTimeRespository : RespositoryBase<StudyTime>, IStudyTimeRespository
    {
        public StudyTimeRespository(NCKH_DBContext repositoryContext)
           : base(repositoryContext)
        {

        }

        public List<ExamDTO> GetExam_Schedules(long studentId)
        {
            List<StudyTime> listStudyTimeById = FindByCondition(x => x.studentId.Equals(studentId)).ToList();
            long currentSemester = listStudyTimeById.Max(x => x.semesterId);
            List<StudyTime> listStudyTime = listStudyTimeById.FindAll(x => x.semesterId.Equals(currentSemester));
            List<ExamDTO> result = new List<ExamDTO>();
            foreach(StudyTime item in listStudyTime)
            {
                Exam_Schedule exam = RespositoryContext.Exam_Schedules.Find(item.id);
                Course course = RespositoryContext.Course.Find(item.Courseid);
                if (exam != null)
                {
                    ExamDTO subResult = new ExamDTO(course.name, exam.day, exam.shift, exam.type, exam.number, exam.room, exam.note);
                    result.Add(subResult);
                }
            }
            return result.OrderBy(x => x.day).ToList();
        }

        public List<SemesterDTO> GetResultOfAverageSemesterByStudentId(long studentId)
        {
            List<SemesterDTO> result = new List<SemesterDTO>();
            List<Semester> listSemester = RespositoryContext.Semester.ToList();
            List<long> filterStudytime = new List<long>();
            foreach (Semester item in listSemester) {
                List<StudyTime> listStudyTime = FindByCondition(x => x.studentId.Equals(studentId) && x.semesterId.Equals(item.id)).ToList();
                if(listStudyTime.Count == 0)
                {
                    continue;
                }
                double total = 0;
                double i = 0;
                int tongTinchi = 0;
                foreach (StudyTime item1 in listStudyTime.OrderBy(x => x.semesterId))
                {
                    if (filterStudytime.Contains(item1.Courseid))
                    {
                        continue;
                    }
                    filterStudytime.Add(item1.Courseid);
                    Result mark = RespositoryContext.Results.Find(item1.id);
                    if(mark == null)
                    {
                        continue;
                    } 
                    total += mark.mark_exam * 0.7 + mark.mark_process * 0.3;

                    Course course = RespositoryContext.Course.Find(item1.Courseid);
                    tongTinchi += course.tinchi;
                    i++;
                }
                if(total != 0)
                {
                    total = total / i;
                }
                SemesterDTO subResult = new SemesterDTO(item.begin_year, item.end_year, item.times, Math.Round(total, 2), Math.Round((total * 4) / 10,2), tongTinchi);
                result.Add(subResult);
            };
            
            Dictionary<string, ValueScore> tempResult = new Dictionary<string, ValueScore>();
            foreach (SemesterDTO item in result.OrderBy(x => x.begin_year))
            {
                String begin_year = item.begin_year;
                ValueScore valueScore = new ValueScore(item.totalByTen, item.totalByFour, item.tinchi);
                if(result.Count % 2 != 0 && item.begin_year == result[result.Count - 1].begin_year)
                {
                    break;
                }
                if (tempResult.ContainsKey(begin_year))
                {
                    ValueScore tempValueScore = tempResult[begin_year];
                    ValueScore valueScore1 = new ValueScore(item.totalByTen + tempValueScore.totalByTen, item.totalByFour + tempValueScore.totalByFour, item.tinchi + tempValueScore.tongTinChi);
                    tempResult[begin_year] = valueScore1;
                }
                else
                {
                    tempResult.Add(begin_year, valueScore);
                }
                
            }
            for(int i = 0; i < tempResult.Count; i++)
            {
                String begin_year = tempResult.ElementAt(i).Key;
                int end_year = Int32.Parse(begin_year) + 1;
                double total = Math.Round(tempResult.ElementAt(i).Value.totalByTen / 2, 2);
                double total1 = Math.Round(tempResult.ElementAt(i).Value.totalByFour / 2, 2);
                int tongTinChi = tempResult.ElementAt(i).Value.tongTinChi;
                SemesterDTO subResult = new SemesterDTO(begin_year, end_year.ToString(), 3, total, total1, tongTinChi);
                result.Add(subResult);
            }

            return result.OrderBy(x => x.begin_year).ToList();
        }

        public List<StudyTimeDTO> GetResultOfSemesterByStudentId(long studentId)
        {
            List<StudyTime> list = FindByCondition(x => x.studentId.Equals(studentId)).ToList();
            List<StudyTimeDTO> result = new List<StudyTimeDTO>();
            foreach (StudyTime item in list)
            {
                int count = 1;
                Course course = RespositoryContext.Course.Find(item.Courseid);

                Result mark =  RespositoryContext.Results.Find(item.id);
                if(mark == null)
                {
                    continue;
                }
                ResultDTO tempMark = new ResultDTO();
                tempMark.mark_process = mark.mark_process;
                tempMark.mark_exam = mark.mark_exam;
                tempMark.evaluation = mark.evaluation;

                StudyTimeDTO subResult = new StudyTimeDTO(item.semesterId, course.name, tempMark);

                result.ForEach(x =>
                {
                    if (x.course == subResult.course)
                    {
                        count++;
                    }
                });
                subResult.times = count;

                result.Add(subResult);
                
            }
            return result;
        }

        public Dictionary<string, List<CourseClassDTO>> GetStudySchedule(long studentId)
        {
            DateTime nowDate = DateTime.Now;
            List<StudyTime> listStudyTimeById = FindByCondition(x => x.studentId.Equals(studentId)).ToList();
            long currentSemester = listStudyTimeById.Max(x => x.semesterId);
            List<StudyTime> listStudyTime = listStudyTimeById.FindAll(x => x.semesterId.Equals(currentSemester));
            var dictionaryCourseClass = new Dictionary<string, List<CourseClassDTO>>();
            List<CourseClassDTO> t1 = new List<CourseClassDTO>();
            List<CourseClassDTO> t2 = new List<CourseClassDTO>();
            List<CourseClassDTO> t3 = new List<CourseClassDTO>();
            List<CourseClassDTO> t4 = new List<CourseClassDTO>();

            dictionaryCourseClass.Add("t1", t1);
            dictionaryCourseClass.Add("t2", t2);
            dictionaryCourseClass.Add("t3", t3);
            dictionaryCourseClass.Add("t4", t4);

            foreach(StudyTime item in listStudyTime)
            {
                List<CourseClass> listCourseClass = RespositoryContext.CourseClass.Where(x => x.Studytimeid.Equals(item.id)).ToList();
                Course course = RespositoryContext.Course.Find(item.Courseid);
                
                foreach (CourseClass item1 in listCourseClass)
                {
                    Stage stage = RespositoryContext.Stages.Where(x => x.courseClassId.Equals(item1.id) && x.begin_time < nowDate).FirstOrDefault();
                    if(stage != null)
                    {
                        List<Lesson> listLesson = RespositoryContext.Lessons.Where(x => x.stageId.Equals(stage.id)).ToList();
                        foreach(Lesson item2 in listLesson)
                        {
                            if (dictionaryCourseClass.ContainsKey(item2.shift))
                            {
                                CourseClassDTO courseClass = new CourseClassDTO(course.name, item1.name, item2.location, item2.day);
                                dictionaryCourseClass[item2.shift].Add(courseClass);
                            }
                        }
                        
                    }
                }
            }
            foreach(var item in dictionaryCourseClass){
                for (int i = 1; i <= 7; i++)
                {
                    List<CourseClassDTO> list = item.Value.FindAll(x => x.day.Equals(i)).ToList();
                    if (list.Count == 0)
                    {
                        CourseClassDTO courseClass = new CourseClassDTO("", "", "", i);
                        item.Value.Add(courseClass);
                    }
                    else
                    {
                        continue;
                    }
                }
            }
                return dictionaryCourseClass;
        }
    }
}
