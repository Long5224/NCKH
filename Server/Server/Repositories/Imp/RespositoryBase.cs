using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Server.Models;

namespace Server.Repositories.Imp
{
    public abstract class RespositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected NCKH_DBContext RespositoryContext { get; set; }
        public RespositoryBase(NCKH_DBContext repositoryContext)
        {
            this.RespositoryContext = repositoryContext;
        }
        public IQueryable<T> FindAll()
        {
            return this.RespositoryContext.Set<T>().AsNoTracking();
        }
        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.RespositoryContext.Set<T>().Where(expression).AsNoTracking();
        }
    
        public void Create(T entity)
        {
            this.RespositoryContext.Set<T>().Add(entity);
            this.RespositoryContext.SaveChanges();
        }
        public void Update(T entity)
        {
            this.RespositoryContext.Set<T>().Update(entity);
            this.RespositoryContext.SaveChanges();
        }
        public void Delete(T entity)
        {
            this.RespositoryContext.Set<T>().Remove(entity);
            this.RespositoryContext.SaveChanges();
        }
    }
}
