using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Models;
using InsuranceAPI.Services;
using InsuranceAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DbInsuranceContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("database"))
);
//adding DI instances
builder.Services.AddScoped<IInsuredService, InsuredService>();
builder.Services.AddScoped<IInsuredRepository,InsuredRepository>(); 
builder.Services.AddCors(opt => {
    opt.AddPolicy("angular_origin",policy =>
                          policy.WithOrigins("http://localhost:4200")
                          );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors("angular_origin");

app.MapControllers();

app.Run();
