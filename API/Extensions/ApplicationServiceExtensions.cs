using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationservices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod()
                    .WithOrigins("http://localhost:3000/");
                });
            });
            services.AddMediatR(cfg =>
                cfg.RegisterServicesFromAssembly(typeof(List).Assembly));
            services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

            return services;
        }
    }
}