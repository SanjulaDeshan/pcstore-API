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

		public async Task<List<Item>> GetAllWithDetailsAsync()
		{
			return await dbContext.Items
				.Include(i => i.Category)
				.Include(i => i.Brand)
				.Include(i => i.ItemSpecification)
				.ToListAsync();
		}

        public async Task<List<Item>> GetAllByCategoryIdAsync(Guid categoryId, int pageNumber = 1, int pageSize = 12, string? brand = null, decimal? minPrice = null, decimal? maxPrice = null)
        {
            // 1. Start with the database query (IQueryable)
            var query = dbContext.Items
                .Where(i => i.CategoryId == categoryId)
                .Include(i => i.Category)
                .Include(i => i.Brand)
                .AsQueryable();

            // 2. Filter by Brand Name (This runs on SQL Server)
            if (!string.IsNullOrWhiteSpace(brand))
            {
                query = query.Where(x => x.Brand.Name.Contains(brand));
            }

            // 3. Execution Phase
            // Since Price is a string with commas, we MUST bring the data into memory 
            // to do the complex string-to-decimal parsing.
            var items = await query
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync(); // Pull from DB to memory safely here

            // 4. In-Memory Filtering (Price)
            var filteredItems = items.AsEnumerable();

            if (minPrice.HasValue)
            {
                filteredItems = filteredItems.Where(x =>
                    decimal.Parse(x.Price.Replace(",", "").Trim()) >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                filteredItems = filteredItems.Where(x =>
                    decimal.Parse(x.Price.Replace(",", "").Trim()) <= maxPrice.Value);
            }

            // 5. Manual Pagination (Since we are now in memory)
            return filteredItems
                .OrderByDescending(i => i.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public async Task<int> GetCountByCategoryIdAsync(Guid categoryId, string? brand = null, decimal? minPrice = null, decimal? maxPrice = null)
        {
            // 1. Start with the database query
            var query = dbContext.Items
                .Where(i => i.CategoryId == categoryId)
                .Include(i => i.Brand)
                .AsQueryable();

            // 2. Filter by Brand (SQL side)
            if (!string.IsNullOrWhiteSpace(brand))
            {
                query = query.Where(x => x.Brand.Name.Contains(brand));
            }

            // 3. Bring to memory to handle the String-to-Decimal price filtering
            var items = await query.ToListAsync();
            var filteredItems = items.AsEnumerable();

            // 4. Apply Price Filters (In-Memory side)
            if (minPrice.HasValue)
            {
                filteredItems = filteredItems.Where(x =>
                    decimal.Parse(x.Price.Replace(",", "").Trim()) >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                filteredItems = filteredItems.Where(x =>
                    decimal.Parse(x.Price.Replace(",", "").Trim()) <= maxPrice.Value);
            }

            // 5. Return the count of the filtered results
            return filteredItems.Count();
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
            existingItem.ImageUrl = item.ImageUrl;
            existingItem.Availability = item.Availability;

			await dbContext.SaveChangesAsync();
			return existingItem;
		}
	}
}
