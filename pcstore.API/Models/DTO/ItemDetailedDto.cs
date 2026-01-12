namespace pcstore.API.Models.DTO
{
	public class ItemDetailedDto
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public CategoryDto Category { get; set; }
		public BrandDto Brand { get; set; }
		public string Warranty { get; set; }
		public string Price { get; set; }
        public string? ImageUrl { get; set; }
        public string Availability { get; set; }
        public DateTime CreatedAt { get; set; }

		public List<ItemSpecificationDto> ItemSpecifications { get; set; }
	}
}
