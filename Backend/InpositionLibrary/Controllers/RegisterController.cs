using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
    
          [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public RegisterController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            try
            {
                // Check if the provided username already exists
                var existingUser = _context.Lexuesi.FirstOrDefault(u => u.EmriPerdoruesit == model.EmriPerdoruesit);
                if (existingUser != null)
                {
                    return Conflict("Username already exists");
                }

                // Create a new user object
               var newUser = new Lexuesi
{
    Emri = model.Emri,
    EmriPerdoruesit = model.EmriPerdoruesit,
    NumriTelefonit = model.NumriTelefonit,
    Fjalekalimi = model.Fjalekalimi,
    Bibloteka = model.Bibloteka
};


                // Add the new user to the database
                _context.Lexuesi.Add(newUser);
                _context.SaveChanges();

                return Ok("Registration successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
    
}