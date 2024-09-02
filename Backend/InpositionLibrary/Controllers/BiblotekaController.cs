using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs;
using InpositionLibrary.DTOs.Bibloteka;
using InpositionLibrary.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InpositionLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class BiblotekaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public BiblotekaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var bibloteka = _context.Bibloteka.ToList().Select(s => s.toBiblotekaDto());
            return Ok(bibloteka);
        }

        [HttpGet("summary")]
        public async Task<ActionResult<IEnumerable<object>>> GetBiblotekaSummary()
        {
            var biblotekaList = await _context.Bibloteka
                .Select(b => new
                {
                    Id = b.Id,
                    Pika = b.Pika
                })
                .ToListAsync();

            return Ok(biblotekaList);
        }


        [HttpGet("pika/{id}")]
public async Task<ActionResult<string>> GetPikaById([FromRoute] int id)
{
    var pika = await _context.Bibloteka
        .Where(b => b.Id == id)
        .Select(b => b.Pika)
        .FirstOrDefaultAsync();

    if (pika == null)
    {
        return NotFound();
    }

    return Ok(pika);
}


        [HttpPost]
        public IActionResult Create([FromBody] BiblotekaCreateDto biblotekaDto)
        {
            var biblotekaModel = biblotekaDto.toBiblotekaFromCreateDto();
            _context.Bibloteka.Add(biblotekaModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = biblotekaModel.Id }, biblotekaModel.toBiblotekaDto());
        }






        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] BiblotekaUpdateDto updateDto)
        {
            var biblotekaModel = _context.Bibloteka.FirstOrDefault(b => b.Id == id);
            if (biblotekaModel == null)
            {
                return NotFound();
            }
            biblotekaModel.Pika = updateDto.Pika;
            biblotekaModel.Adresa = updateDto.Adresa;
            biblotekaModel.Kontakti = updateDto.Kontakti;

            _context.SaveChanges();
            return Ok(biblotekaModel.toBiblotekaDto());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var biblotekaModel = _context.Bibloteka.FirstOrDefault(b => b.Id == id);
            if (biblotekaModel == null)
            {
                return NotFound();
            }
            _context.Bibloteka.Remove(biblotekaModel);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("pikat")]
        public async Task<IActionResult> GetPikat()
        {
            var pikat = await _context.Bibloteka
                .Select(b => new
                {
                    Id = b.Id,
                    Pika = b.Pika
                })
                .ToListAsync();

            return Ok(pikat);
        }
    }
}
