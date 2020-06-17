using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Shared;


namespace Web.Api.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<UserMapEvent>()
                        .HasKey(bc => new { bc.UserId, bc.MapEventId });
            modelBuilder.Entity<UserMapEvent>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.MapEvents)
                .HasForeignKey(bc => bc.UserId);
            modelBuilder.Entity<UserMapEvent>()
                .HasOne(bc => bc.MapEvent)
                .WithMany(c => c.CurrentUsers)
                .HasForeignKey(bc => bc.MapEventId);
            modelBuilder.Entity<User>(ConfigureUser);


        }

        public void ConfigureUser(EntityTypeBuilder<User> builder)
        {
            var navigation = builder.Metadata.FindNavigation(nameof(User.RefreshTokens));
            //EF access the RefreshTokens collection property through its backing field
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            builder.Ignore(b => b.Email);
            builder.Ignore(b => b.PasswordHash);

        }
        public DbSet<SignalData> SignalsData { get; set; }
        public DbSet<UserMapEvent> UserMapEvents { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MapEvent> MapEvents { get; set; }
        public DbSet<Coordinate> Coordinates { get; set; }

        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }

        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            // var userModified = this._userRepository.GetCurrentUser().GetAwaiter().GetResult();
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ((BaseEntity)entry.Entity).Created = DateTime.UtcNow;
                    //  ((BaseEntity)entry.Entity).CreatedUser = userModified;
                }
                ((BaseEntity)entry.Entity).Modified = DateTime.UtcNow;
                //  ((BaseEntity)entry.Entity).ModifiedUser = userModified;
            }
        }
    }
}


