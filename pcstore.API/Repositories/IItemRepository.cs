using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public interface IItemRepository
	{
		Task<List<Item>> GetAllAsync();
		Task<Item?> GetByIdAsync(Guid id);
	}
}
