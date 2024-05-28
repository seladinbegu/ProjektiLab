using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace InpositionLibrary.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
         : base(dbContextOptions)
        {}
            public DbSet<Bibloteka> Bibloteka{get; set;}
            public DbSet<Punetori> Punetori { get; set; }

            public DbSet<Libri> Libri { get; set; }


            public DbSet<Lexuesi> Lexuesi {get; set;}
        
    
    }
}