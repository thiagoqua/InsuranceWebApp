using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Models;
using InsuranceAPI.Services;
using InsuranceAPI.Repositories;
using System.Text.Json.Serialization;

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
builder.Services.AddScoped<IInsuredRepository, InsuredRepository>();
builder.Services.AddScoped<IAddressRepository,AddressRepository>();
builder.Services.AddScoped<IPhoneRepository, PhoneRepository>();
builder.Services.AddScoped<IProducerRepository, ProducerRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();

//cors
builder.Services.AddCors(opt => {
    opt.AddPolicy("everything", policy => policy.AllowAnyOrigin()
                                                .AllowAnyHeader()
                                                .AllowAnyMethod()
                                                );
});

builder.Services.AddControllers().AddJsonOptions(opt => 
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);

builder.Services.AddControllers(opt =>
    opt.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors("everything");

app.MapControllers();

app.Run();
