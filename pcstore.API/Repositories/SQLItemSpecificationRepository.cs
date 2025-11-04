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
			return await dbContext.ItemsSpecifications.ToListAsync();
		}

		public async Task<ItemSpecification?> GetByIdAsync(Guid id)
		{
			return await dbContext.ItemsSpecifications.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<ItemSpecification> CreateAsync(ItemSpecification itemSpecification)
		{
			await dbContext.ItemsSpecifications.AddAsync(itemSpecification);
			await dbContext.SaveChangesAsync();
			return itemSpecification;
		}

		public async Task<ItemSpecification?> DeleteAsync(Guid id)
		{
			var existingItemSpecification = await dbContext.ItemsSpecifications.FirstOrDefaultAsync(x => x.Id == id);

			if (existingItemSpecification == null)
			{
				return null;
			}

			dbContext.ItemsSpecifications.Remove(existingItemSpecification);
			await dbContext.SaveChangesAsync();
			return existingItemSpecification;
		}

		public async Task<ItemSpecification?> UpdateAsync(Guid id, ItemSpecification itemSpecification)
		{
			var existingItemSpecification = await dbContext.ItemsSpecifications.FirstOrDefaultAsync(x => x.Id == id);

			if (existingItemSpecification == null)
			{
				return null;
			}

			existingItemSpecification.ItemId = itemSpecification.ItemId;
			existingItemSpecification.Name = itemSpecification.Name;
			existingItemSpecification.Value = itemSpecification.Value;

			await dbContext.SaveChangesAsync();
			return existingItemSpecification;
		}
	}
}
