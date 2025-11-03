using Microsoft.EntityFrameworkCore;
using pcstore.API.Data;
using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public class SQLItemRepository : IItemRepository
	{
		private readonly PCStoreDbContext dbContext;

		public SQLItemRepository(PCStoreDbContext dbContext)
        {
			this.dbContext = dbContext;
		}

		public async Task<List<Item>> GetAllAsync()
		{
			return await dbContext.Items.ToListAsync();
		}

		public async Task<Item?> GetByIdAsync(Guid id)
		{
			return await dbContext.Items.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<Item> CreateAsync(Item item)
		{
			await dbContext.Items.AddAsync(item);
			await dbContext.SaveChangesAsync();
			return item;
		}

		public async Task<Item?> DeleteAsync(Guid id)
		{
			var existingItem = await dbContext.Items.FirstOrDefaultAsync(x => x.Id == id);

			if (existingItem == null)
			{
				return null;
			}

			dbContext.Items.Remove(existingItem);
			await dbContext.SaveChangesAsync();
			return existingItem;
		}

		public async Task<Item?> UpdateAsync(Guid id, Item item)
		{
			var existingItem = await dbContext.Items.FirstOrDefaultAsync(x => x.Id == id);

			if (existingItem == null)
			{
				return null;
			}

			existingItem.Name = item.Name;
			existingItem.CategoryId = item.CategoryId;
			existingItem.BrandId = item.BrandId;
			existingItem.Warranty = item.Warranty;
			existingItem.Price = item.Price;

			await dbContext.SaveChangesAsync();
			return existingItem;
		}
	}
}
