using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.Models;
using Microsoft.EntityFrameworkCore;

public interface IBiblotekaService
{
    Task<List<Bibloteka>> GetAllBiblotekaAsync();
    Task<bool> BiblotekaExistsAsync(int id);
}

public class BiblotekaService : IBiblotekaService
{
    private readonly ApplicationDbContext _context;

    public BiblotekaService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Bibloteka>> GetAllBiblotekaAsync()
    {
        return await _context.Bibloteka.ToListAsync();
    }

    public async Task<bool> BiblotekaExistsAsync(int id)
    {
        return await _context.Bibloteka.AnyAsync(b => b.Id == id);
    }
}
