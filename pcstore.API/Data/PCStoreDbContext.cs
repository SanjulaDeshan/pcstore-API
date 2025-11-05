using login.api.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using pcstore.API.Models.Domain;

namespace pcstore.API.Data
{
	public class PCStoreDbContext: DbContext
	{
        public PCStoreDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemSpecification> ItemsSpecifications { get; set; }
		public DbSet<User> Users { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Item>()
				.HasMany(i => i.ItemSpecification)
				.WithOne(s => s.Item)
				.HasForeignKey(s => s.ItemId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Brand>()
				.HasIndex(b => b.Name)
				.IsUnique();
		}

	}
}
