using Server.Models;
using Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories.Imp
{
    public class GeneralRespository : RespositoryBase<General>, IGeneralRespository
    {
        public GeneralRespository(NCKH_DBContext repositoryContext)
           : base(repositoryContext)
        {
        }
        public List<General> GetGenerals(long studentId)
        {
            List<General> listGeneral = FindByCondition(x => x.studentId.Equals(studentId)).ToList();
            for (int i = 0; i < listGeneral.Count; i++) {
                Semester semester = RespositoryContext.Semester.Find(listGeneral[i].semesterId);
                listGeneral[i].Semester = semester;
            }
          
            return listGeneral;
        }
    }
}
