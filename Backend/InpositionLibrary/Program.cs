using InpositionLibrary.Controllers;
using InpositionLibrary.Data;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using YourProject.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(); // Add this line to use NewtonsoftJson

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<AuthController>();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes("YourSecretKeyHere1234567890123456789012adasjdsaudbsaudsaudhsaudbsaudbasudbsadbasudbsuadbusabdusabdusabdsuadbsajfbdskfjdabfyidsafjdabfaf78a1fadfasjhfdasudgias"); // Replace "YourSecretKeyHere1234567890123456789012" with your actual secret key

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "http://localhost:5132", // Local issuer URL
            ValidAudience = "http://localhost:5132", // Local audience URL
            
            IssuerSigningKey = new SymmetricSecurityKey(key) // Strong secret key
        };
    });

// Ensure your secret key matches
builder.Services.AddSingleton<TokenService>();
    builder.Services.AddScoped<IPasswordHasher<Lexuesi>, Microsoft.AspNetCore.Identity.PasswordHasher<Lexuesi>>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication(); // Ensure authentication middleware is used
app.UseAuthorization();

app.MapControllers();

app.Run();
