using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public interface IBrandRepository
	{
		Task<List<Brand>> GetAllAsync();
		Task<Brand?> GetByIdAsync(Guid id);
	}
}
