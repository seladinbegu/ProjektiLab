using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using inpositionlibrary.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inpositionlibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PunetoriController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        public PunetoriController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var punetori = context.Punetori.ToList();
            return Ok(punetori);
        }

        // GET: api/Punetori/id/5
        [HttpGet("id/{id}")]
        public IActionResult GetById(int id)
        {
            var punetori = context.Punetori.Find(id);
            return punetori == null ? (IActionResult)NotFound() : Ok(punetori);
        }

        // GET: api/Punetori/emri/JohnDoe
        [HttpGet("emri/{emri}")] // Endpoints
        public IActionResult GetByName([FromRoute]string emri)
        {
            var punetori = context.Punetori.FirstOrDefault(p => p.Emri == emri);
            return punetori == null ? (IActionResult)NotFound() : Ok(punetori);
        }

        [HttpGet("pika/{pika}")]
        public IActionResult GetByPika([FromRoute]string pika)
        {
            var punetori = context.Punetori.Where(p => p.BiblotekaPika == pika).ToList();
            return punetori.Count == 0 ? (IActionResult)NotFound() : Ok(punetori);
        }

        [HttpGet("pozicioni/{pozicioni}")]
        public IActionResult GetByPozicioni([FromRoute]string pozicioni)
        {
            var punetori = context.Punetori.Where(p => p.Pozicioni == pozicioni).ToList();
            return punetori.Count == 0 ? (IActionResult)NotFound() : Ok(punetori);
        }

[HttpPost]
public async Task<IActionResult> Post([FromBody] Models.Punetori punetori)
{
    if (punetori == null)
    {
        return BadRequest("Punetori object is null");
    }

   try
{
    await context.SaveChangesAsync();
    return CreatedAtAction("GetById", new { id = punetori.ID_Punetori }, punetori);
}
catch (Exception ex)
{
    Console.WriteLine("Error occurred while saving entity changes:");
    Console.WriteLine(ex.ToString());
    return StatusCode(500, "Internal server error occurred while saving entity changes");
}

}


[HttpPut("{id}")]
public async Task<IActionResult> Put(int id, [FromBody] Models.Punetori punetori)
{
    if (id != punetori.ID_Punetori)
    {
        return BadRequest("Invalid ID");
    }

    try
    {
        context.Entry(punetori).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!PunetoriExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error occurred while updating entity:");
        Console.WriteLine(ex.ToString());
        return StatusCode(500, "Internal server error occurred while updating entity");
    }
}

private bool PunetoriExists(int id)
{
    return context.Punetori.Any(p => p.ID_Punetori == id);
}


    }
}
