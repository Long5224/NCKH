using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using Server.Repositories.Imp;
using Server.Helper;
using NLog;
using System.IO;
using Server.LoggerService;
using Server.LoggerService.Imp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using EmailService;
using Microsoft.Extensions.FileProviders;
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

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            

            services.AddAuthentication(opt => {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
            options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "http://localhost:5000",
            ValidAudience = "http://localhost:5000",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
            };
            });

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

            //CoRs
            services.AddCors();

            //LoopJson
            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            var emailConfig = Configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
           options.WithOrigins("http://localhost:3000")
           .AllowAnyHeader()
           .AllowAnyOrigin()
           .AllowAnyMethod()
           );
           
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles(new StaticFileOptions {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                RequestPath = "/Images",
            });

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

           
        }
    }
}
