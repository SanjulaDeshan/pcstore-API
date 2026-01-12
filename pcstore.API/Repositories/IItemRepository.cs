using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public interface IItemRepository
	{
		Task<List<Item>> GetAllAsync();
		Task<Item?> GetByIdAsync(Guid id);
		Task<Item> CreateAsync(Item item);
		Task<Item?> DeleteAsync(Guid id);
		Task<Item?> UpdateAsync(Guid id, Item item);

		Task<List<Item>> GetAllWithDetailsAsync();
        Task<List<Item>> GetAllByCategoryIdAsync(Guid categoryId, int pageNumber = 1, int pageSize = 12, string? brand = null, decimal? minPrice = null, decimal? maxPrice = null, string? search = null, string? availability = null);

        Task<int> GetCountByCategoryIdAsync(Guid categoryId, string? brand = null, decimal? minPrice = null, decimal? maxPrice = null, string? search = null, string? availability = null);
    }
}
