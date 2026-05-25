using login.api.Models.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using pcstore.API.Data;
using pcstore.API.Mappings;
using pcstore.API.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo { Title = "NZ Walks API", Version = "v1" });
	options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
	{
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.ApiKey,
		Scheme = JwtBearerDefaults.AuthenticationScheme
	});

	options.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = JwtBearerDefaults.AuthenticationScheme
				},
				Scheme = "Oauth2",
				Name = JwtBearerDefaults.AuthenticationScheme,
				In = ParameterLocation.Header
			},
			new List<string>()
		}
	});
});

builder.Services.AddDbContext<PCStoreDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("PCStoreConnectionString")));

// Add JWT authentication
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = builder.Configuration["Jwt:Issuer"],
			ValidAudience = builder.Configuration["Jwt:Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(key)
		};
	});

builder.Services.AddScoped<ICategoryRepository, SQLCategoryRepository>();
builder.Services.AddScoped<IBrandRepository, SQLBrandRepository>();
builder.Services.AddScoped<IItemRepository, SQLItemRepository>();
builder.Services.AddScoped<IItemSpecificationRepository, SQLItemSpecificationRepository>();
builder.Services.AddScoped<IAdvertisementRepository, SQLAdvertisementRepository>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS",
        policy => policy.WithOrigins("http://localhost:3000") // Your Next.js URL
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Run migrations and seed data
using (var scope = app.Services.CreateScope())
{
	var db = scope.ServiceProvider.GetRequiredService<PCStoreDbContext>();
	db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
	var db = scope.ServiceProvider.GetRequiredService<PCStoreDbContext>();

	// Apply pending migrations
	db.Database.Migrate();

	// Seed admin user if not already present
	if (!db.Users.Any(u => u.Username == "admin"))
	{
		var passwordHasher = new Microsoft.AspNetCore.Identity.PasswordHasher<User>();
		var admin = new login.api.Models.Domain.User
		{
			Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
			Username = "admin",
			Role = "Admin",
			PasswordHash = passwordHasher.HashPassword(null, "Admin@123")
		};
		db.Users.Add(admin);
		db.SaveChanges();
	}
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors("AllowNextJS");

app.UseAuthorization();

app.MapControllers();

app.Run();
