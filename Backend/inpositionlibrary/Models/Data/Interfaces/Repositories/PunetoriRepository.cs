using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace inpositionlibrary.Models.Data.Interfaces.Repositories
{
    public class PunetoriRepository : IPunetoriRepository
    {

         private readonly AppDbContext _context;
        public PunetoriRepository(AppDbContext context)
        {
            _context = context;
        }






        public void AddPunetori(Punetori punetori)
        {
              if (punetori == null)
            {
                throw new ArgumentNullException(nameof(punetori));
            }
            _context.Punetori.Add(punetori);
            _context.SaveChanges();
        }








        public void DeletePunetori(int id)
        {
             var punetori = _context.Punetori.Find(id);
            if (punetori == null)
            {
                throw new ArgumentNullException(nameof(punetori));
            }
            _context.Punetori.Remove(punetori);
            _context.SaveChanges();
        }








        public List<Punetori> GetAllPunetori()
        {
          return _context.Punetori.ToList();
        }






        public Punetori GetAllPunetoriById(int id)
        {
        return _context.Punetori.FirstOrDefault(p => p.Id == id);

        }









        public void UpdatePunetori(Punetori punetori)
        {
             if (punetori == null)
            {
                throw new ArgumentNullException(nameof(punetori));
            }
            _context.Entry(punetori).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}