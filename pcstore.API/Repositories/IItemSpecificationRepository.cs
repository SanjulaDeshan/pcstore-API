using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public interface IItemSpecificationRepository
	{
		Task<List<ItemSpecification>> GetAllAsync();
		Task<ItemSpecification?> GetByIdAsync(Guid id);
		Task<ItemSpecification> CreateAsync(ItemSpecification itemSpecification);
	}
}
