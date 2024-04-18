using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using inpositionlibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;


namespace inpositionlibrary.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)//konstruktori
        {
            
        }
        public DbSet<Bibloteka> Bibloteka {get; set;}

        public DbSet<Punetori> Punetori{get; set;}
        
    }
}