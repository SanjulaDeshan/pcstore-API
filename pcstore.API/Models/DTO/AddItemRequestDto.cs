namespace pcstore.API.Models.DTO
{
	public class AddItemRequestDto
	{
		public string Name { get; set; }
		public Guid CategoryId { get; set; }
		public Guid BrandId { get; set; }
		public string Warranty { get; set; }
		public string Price { get; set; }
        public string? ImageUrl { get; set; }
        public string Availability { get; set; }
    }
}
