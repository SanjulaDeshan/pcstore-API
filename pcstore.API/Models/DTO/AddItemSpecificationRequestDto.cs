namespace pcstore.API.Models.DTO
{
	public class AddItemSpecificationRequestDto
	{
		public Guid ItemId { get; set; }
		public string Name { get; set; }
		public string Value { get; set; }
	}
}
