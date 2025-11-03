namespace pcstore.API.Models.DTO
{
	public class UpdateItemSpecificationRequestDTO
	{
		public Guid ItemId { get; set; }
		public string Name { get; set; }
		public string Value { get; set; }
	}
}
