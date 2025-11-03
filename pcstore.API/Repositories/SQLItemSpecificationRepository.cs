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
	}
}
