using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public interface ICategoryRepository
	{
		Task<Category?> GetByIdAsync(Guid id);
		Task<Category> CreateAsync(Category category);
	}
}
