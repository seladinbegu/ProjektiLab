using Microsoft.AspNetCore.Mvc;
using YourProject.Services;
using Microsoft.EntityFrameworkCore;
using InpositionLibrary.Data;
using InpositionLibrary.Models; // Import Entity Framework Core namespace if not already imported

namespace InpositionLibrary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly ApplicationDBContext _context;

        public AuthController(TokenService tokenService, ApplicationDBContext context)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // Retrieve user from the database based on the provided username
            var user = _context.Lexuesi.SingleOrDefault(u => u.EmriPerdoruesit == model.Username);
            
            // Check if user exists and if the provided password matches
            if (user != null && user.Fjalekalimi == model.Password)
            {
                // Authentication successful, generate JWT token
                var token = _tokenService.GenerateToken(user.EmriPerdoruesit);
                return Ok(new { Token = token });
            }

            // Authentication failed
            return Unauthorized();
        }
    }
}
