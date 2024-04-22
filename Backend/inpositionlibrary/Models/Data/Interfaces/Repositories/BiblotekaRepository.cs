using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace inpositionlibrary.Models.Data.Interfaces.Repositories
{
    public class BiblotekaRepository : IBiblotekaRepository
    {


        private readonly AppDbContext _context;
        public BiblotekaRepository(AppDbContext context)
        {
            _context = context;
        }





        
                public void AddBibloteka(Bibloteka bibloteka)
        {
             if (bibloteka == null)
            {
                throw new ArgumentNullException(nameof(bibloteka));
            }
            _context.Bibloteka.Add(bibloteka);
            _context.SaveChanges();
        }




        public void DeleteBibloteka(string pika)
        {
             var bibloteka = _context.Bibloteka.Find(pika);
            if (bibloteka == null)
            {
                throw new ArgumentNullException(nameof(bibloteka));
            }
            _context.Bibloteka.Remove(bibloteka);
            _context.SaveChanges();
        }








        public List<Bibloteka> GetAllBibloteka()
        {
          return _context.Bibloteka.ToList();

        }






        public Bibloteka GetBiblotekaById(string pika)
        {
           return _context.Bibloteka.FirstOrDefault(p => p.Pika == pika);

        }








        public void UpdateBibloteka(Bibloteka bibloteka)
        {
            if (bibloteka == null)
            {
                throw new ArgumentNullException(nameof(bibloteka));
            }
            _context.Entry(bibloteka).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}