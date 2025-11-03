namespace pcstore.API.Models.DTO
{
	public class ItemSpecificationDto
	{
		public Guid Id { get; set; }
		public Guid ItemId { get; set; }
		public string Name { get; set; }
		public string Value { get; set; }
	}
}
