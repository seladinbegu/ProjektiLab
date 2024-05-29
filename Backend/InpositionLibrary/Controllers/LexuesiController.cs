using System;
using System.Linq;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Lexuesi;
using InpositionLibrary.Mappers;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class LexuesiController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPasswordHasher<Lexuesi> _passwordHasher;

        public LexuesiController(ApplicationDBContext context, IPasswordHasher<Lexuesi> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var lexuesi = _context.Lexuesi.Select(s => s.toLexuesiDto()).ToList();
            return Ok(lexuesi);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateLexuesiRequestDto lexuesiDto)
        {
            try
            {
                // Check if username already exists
                if (_context.Lexuesi.Any(l => l.EmriPerdoruesit == lexuesiDto.EmriPerdoruesit))
                {
                    return Conflict("Username already exists");
                }

                // Hash the password
                var hashedPassword = _passwordHasher.HashPassword(null, lexuesiDto.Fjalekalimi);

                // Create a new Lexuesi model with hashed password
                var lexuesiModel = new Lexuesi
                {
                    Emri = lexuesiDto.Emri,
                    EmriPerdoruesit = lexuesiDto.EmriPerdoruesit,
                    Fjalekalimi = hashedPassword,
                    NumriTelefonit = lexuesiDto.NumriTelefonit
                    // Add other properties as needed
                };

                _context.Lexuesi.Add(lexuesiModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(Get), new { Id = lexuesiModel.Id }, lexuesiModel.toLexuesiDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateLexuesiRequestDto updateDto)
        {
            try
            {
                var lexuesiModel = _context.Lexuesi.FirstOrDefault(b => b.Id == id);
                if (lexuesiModel == null)
                {
                    return NotFound();
                }

                lexuesiModel.Id = updateDto.Id;
                lexuesiModel.Emri = updateDto.Emri;
                lexuesiModel.EmriPerdoruesit = updateDto.EmriPerdoruesit;
                lexuesiModel.Fjalekalimi = updateDto.Fjalekalimi;
                lexuesiModel.NumriTelefonit = updateDto.NumriTelefonit;

                _context.SaveChanges();

                return Ok(lexuesiModel.toLexuesiDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var lexuesiModel = _context.Lexuesi.FirstOrDefault(b => b.Id == id);
                if (lexuesiModel == null)
                {
                    return NotFound();
                }

                _context.Lexuesi.Remove(lexuesiModel);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
