using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using Server.Repositories.Imp;
using Server.Helper;
using NLog;
using System.IO;
using Server.LoggerService;
using Server.LoggerService.Imp;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<NCKH_DBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

            //RepositoryWrapper
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

            //DataShaper
            services.AddScoped<IDataShaper<Student>, DataShaper<Student>>();
            services.AddScoped<IDataShaper<Class>, DataShaper<Class>>();
            services.AddScoped<IDataShaper<Faculty>, DataShaper<Faculty>>();

            //AutoMapper
            services.AddAutoMapper(typeof(Startup));
            services.AddControllersWithViews();

            //Logger
            services.AddSingleton<ILoggerManager, LoggerManager>();

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            //LoopJson
            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
