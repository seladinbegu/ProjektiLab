using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Identity;

namespace InpositionLibrary.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions)
            : base(dbContextOptions)
        { }

        public DbSet<Bibloteka> Bibloteka { get; set; }
        public DbSet<Punetori> Punetori { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<Reservations> Reservations { get; set; }
        public DbSet<Libri> Libri { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Seed roles
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" }
            );

            // Configure relationships
            builder.Entity<Reservations>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId);

            builder.Entity<Reservations>()
                .HasOne(r => r.Libri)
                .WithMany(l => l.Reservations)
                .HasForeignKey(r => r.LibriId);
        }
    }
}
