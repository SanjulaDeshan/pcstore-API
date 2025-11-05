using login.api.Models.Domain;
using login.api.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using pcstore.API.Data;
using pcstore.API.Models.DTO;
using pcstore.API.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace pcstore.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly PCStoreDbContext _context;
		private readonly IConfiguration _configuration;
		private readonly PasswordHasher<User> _passwordHasher;

		public AuthController(PCStoreDbContext context, IConfiguration configuration)
		{
			_context = context;
			_configuration = configuration;
			_passwordHasher = new PasswordHasher<User>();
		}

		[HttpPost("login")]
		public IActionResult Login([FromBody] LoginRequestDto request)
		{
			var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);
			if (user == null)
				return Unauthorized("Invalid username or password");

			var verifyResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
			if (verifyResult == PasswordVerificationResult.Failed)
				return Unauthorized("Invalid username or password");

			// Generate JWT
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[]
				{
					new Claim(ClaimTypes.Name, user.Username),
					new Claim(ClaimTypes.Role, user.Role)
				}),
				Expires = DateTime.UtcNow.AddHours(1),
				Issuer = _configuration["Jwt:Issuer"],
				Audience = _configuration["Jwt:Audience"],
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(key),
					SecurityAlgorithms.HmacSha256Signature
				)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);

			var response = new LoginResponseDto
			{
				Token = tokenHandler.WriteToken(token),
				Expiration = tokenDescriptor.Expires!.Value,
				Username = user.Username,
				Role = user.Role
			};

			return Ok(response);
		}

		[Authorize(Roles = "Admin")]
		[HttpPost("change-password")]
		public IActionResult ChangePassword([FromBody] ChangePasswordRequestDto request)
		{
			// Get logged-in username from JWT token
			var username = User.Identity?.Name;
			if (username == null)
				return Unauthorized("User not found.");

			// Find user in database
			var user = _context.Users.FirstOrDefault(u => u.Username == username);
			if (user == null)
				return NotFound("User not found.");

			// Verify old password
			var verifyResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.OldPassword);
			if (verifyResult == PasswordVerificationResult.Failed)
				return BadRequest("Old password is incorrect.");

			// Hash and update new password
			user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
			_context.Users.Update(user);
			_context.SaveChanges();

			return Ok(new
			{
				message = "Password changed successfully."
			});
		}
	}
}
