using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace InpositionLibrary.Data
{
    public class ApplicationDBContext : IdentityDbContext<Lexuesi>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
         : base(dbContextOptions)
        {}
            public DbSet<Bibloteka> Bibloteka{get; set;}
            public DbSet<Punetori> Punetori { get; set; }

            public DbSet<Libri> Libri { get; set; }


            public DbSet<Lexuesi> Lexuesi {get; set;}
            public DbSet<Reservation> Reservation{get; set;}
            







        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);

        }


    }
}