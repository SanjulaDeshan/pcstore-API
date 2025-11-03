using Microsoft.EntityFrameworkCore;
using pcstore.API.Data;
using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public class SQLItemSpecificationRepository : IItemSpecificationRepository
	{
		private readonly PCStoreDbContext dbContext;

		public SQLItemSpecificationRepository(PCStoreDbContext dbContext)
        {
			this.dbContext = dbContext;
		}

		public async Task<List<ItemSpecification>> GetAllAsync()
		{
			return await dbContext.ItemsSpecification.ToListAsync();
		}

		public async Task<ItemSpecification?> GetByIdAsync(Guid id)
		{
			return await dbContext.ItemsSpecification.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<ItemSpecification> CreateAsync(ItemSpecification itemSpecification)
		{
			await dbContext.ItemsSpecification.AddAsync(itemSpecification);
			await dbContext.SaveChangesAsync();
			return itemSpecification;
		}

		public async Task<ItemSpecification?> DeleteAsync(Guid id)
		{
			var existingItemSpecification = await dbContext.ItemsSpecification.FirstOrDefaultAsync(x => x.Id == id);

			if (existingItemSpecification == null)
			{
				return null;
			}

			dbContext.ItemsSpecification.Remove(existingItemSpecification);
			await dbContext.SaveChangesAsync();
			return existingItemSpecification;
		}
	}
}
