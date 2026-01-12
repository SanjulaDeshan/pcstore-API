namespace pcstore.API.Models.Domain
{
	public class Item
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public Guid CategoryId { get; set; }
		public Guid BrandId { get; set; }
		public string Warranty { get; set; }
		public string Price { get; set; }
        public string? ImageUrl { get; set; }
		public string Availability {  get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// Navigation properties
		public Category Category { get; set; }
		public Brand Brand { get; set; }

		// Added: one-to-many relationship
		public ICollection<ItemSpecification> ItemSpecification { get; set; } = new List<ItemSpecification>();

	}
}
