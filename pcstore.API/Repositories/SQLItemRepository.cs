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
	}
}
