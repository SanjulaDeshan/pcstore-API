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
	}
}
