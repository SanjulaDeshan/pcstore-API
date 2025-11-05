namespace pcstore.API.Models.DTO
{
	public class LoginResponseDto
	{
		public string Token { get; set; } = string.Empty;
		public DateTime Expiration { get; set; }
		public string Username { get; set; } = string.Empty;
		public string Role { get; set; } = string.Empty;
	}
}
