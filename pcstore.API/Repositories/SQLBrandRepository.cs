using Microsoft.EntityFrameworkCore;
using pcstore.API.Data;
using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public class SQLBrandRepository : IBrandRepository
	{
		private readonly PCStoreDbContext dbContext;

		public SQLBrandRepository(PCStoreDbContext dbContext)
        {
			this.dbContext = dbContext;
		}

		public async Task<List<Brand>> GetAllAsync()
		{
			return await dbContext.Brands.ToListAsync();
		}

		public async Task<Brand?> GetByIdAsync(Guid id)
		{
			return await dbContext.Brands.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<Brand> CreateAsync(Brand brand)
		{
			await dbContext.Brands.AddAsync(brand);
			await dbContext.SaveChangesAsync();
			return brand;
		}
	}
}
