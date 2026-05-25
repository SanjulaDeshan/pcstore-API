using pcstore.API.Models.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pcstore.API.Repositories
{
    public interface IAdvertisementRepository
    {
        Task<List<Advertisement>> GetAllAsync(bool? isActive = null);
        Task<Advertisement?> GetByIdAsync(Guid id);
        Task<Advertisement> CreateAsync(Advertisement advertisement);
        Task<Advertisement?> UpdateAsync(Guid id, Advertisement advertisement);
        Task<Advertisement?> DeleteAsync(Guid id);
    }
}
