using Microsoft.EntityFrameworkCore;
using pcstore.API.Data;
using pcstore.API.Models.Domain;

namespace pcstore.API.Repositories
{
	public class SQLCategoryRepository : ICategoryRepository
	{
		private readonly PCStoreDbContext dbContext;

		public SQLCategoryRepository(PCStoreDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public async Task<Category> CreateAsync(Category category)
		{
			await dbContext.Categories.AddAsync(category);
			await dbContext.SaveChangesAsync();
			return category;
		}

		public async Task<Category?> GetByIdAsync(Guid id)
		{
			return await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<List<Category>> GetAllAsync()
		{
			return await dbContext.Categories.ToListAsync();
		}

		public async Task<Category?> UpdateAsync(Guid id, Category category)
		{
			var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);

			if (existingCategory == null)
			{
				return null;
			}

			existingCategory.Name = category.Name;

			await dbContext.SaveChangesAsync();
			return existingCategory;
		}

		public async Task<Category?> DeleteAsync(Guid id)
		{
			var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);

			if (existingCategory == null)
			{
				return null;
			}

			dbContext.Categories.Remove(existingCategory);
			await dbContext.SaveChangesAsync();
			return existingCategory;
		}
	}
}
