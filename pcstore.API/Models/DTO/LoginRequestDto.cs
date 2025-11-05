using System.ComponentModel.DataAnnotations;

namespace pcstore.API.Models.DTO
{
	public class LoginRequestDto
	{
		[Required]
		public string Username { get; set; } = string.Empty;

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; } = string.Empty;
	}
}
