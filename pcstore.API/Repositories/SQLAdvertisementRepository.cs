using Microsoft.EntityFrameworkCore;
using pcstore.API.Data;
using pcstore.API.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pcstore.API.Repositories
{
    public class SQLAdvertisementRepository : IAdvertisementRepository
    {
        private readonly PCStoreDbContext dbContext;

        public SQLAdvertisementRepository(PCStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Advertisement> CreateAsync(Advertisement advertisement)
        {
            await dbContext.Advertisements.AddAsync(advertisement);
            await dbContext.SaveChangesAsync();
            return advertisement;
        }

        public async Task<Advertisement?> DeleteAsync(Guid id)
        {
            var existingAdvertisement = await dbContext.Advertisements.FirstOrDefaultAsync(x => x.Id == id);
            if (existingAdvertisement == null)
            {
                return null;
            }

            dbContext.Advertisements.Remove(existingAdvertisement);
            await dbContext.SaveChangesAsync();
            return existingAdvertisement;
        }

        public async Task<List<Advertisement>> GetAllAsync(bool? isActive = null)
        {
            var query = dbContext.Advertisements.AsQueryable();
            
            if (isActive.HasValue)
            {
                query = query.Where(a => a.IsActive == isActive.Value);
            }

            return await query.OrderBy(a => a.SortOrder).ToListAsync();
        }

        public async Task<Advertisement?> GetByIdAsync(Guid id)
        {
            return await dbContext.Advertisements.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Advertisement?> UpdateAsync(Guid id, Advertisement advertisement)
        {
            var existingAdvertisement = await dbContext.Advertisements.FirstOrDefaultAsync(x => x.Id == id);
            if (existingAdvertisement == null)
            {
                return null;
            }

            existingAdvertisement.Title = advertisement.Title;
            existingAdvertisement.Subtitle = advertisement.Subtitle;
            existingAdvertisement.ImageUrl = advertisement.ImageUrl;
            existingAdvertisement.LinkUrl = advertisement.LinkUrl;
            existingAdvertisement.IsActive = advertisement.IsActive;
            existingAdvertisement.SortOrder = advertisement.SortOrder;

            await dbContext.SaveChangesAsync();
            return existingAdvertisement;
        }
    }
}
