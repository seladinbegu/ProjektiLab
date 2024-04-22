using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace inpositionlibrary.Models.Data
{
     public class AppDbContext : DbContext
    {
        public DbSet<Bibloteka> Bibloteka { get; set; }

      public DbSet<Punetori> Punetori { get; set; }



 protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define foreign key relationship
            modelBuilder.Entity<Punetori>()
                .HasOne(p => p.Bibloteka)
                .WithMany()
                .HasForeignKey(p => p.BiblotekaPika);
        }




        protected readonly IConfiguration Configuration;
        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
    }
}