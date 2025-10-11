namespace pcstore.API.Models.Domain
{
	public class ItemSpecification
	{
		public Guid Id { get; set; }
		public Guid ItemId { get; set; }
		public string Name { get; set; }
		public string Value { get; set; }

		// Navigation properties
		public Item Item { get; set; }
	}
}
