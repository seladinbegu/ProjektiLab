using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using InpositionLibrary.Models;

namespace InpositionLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Assign "Admin" role if the username is "seladin", otherwise assign "User" role
                var role = model.Username.Equals("seladin", StringComparison.OrdinalIgnoreCase) ? "Admin" : "User";
                await _userManager.AddToRoleAsync(user, role);

                return Ok(new { Message = "User registered successfully." });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(model.Username);

                // Assign roles based on the username
                if (model.Username.Equals("seladin", StringComparison.OrdinalIgnoreCase))
                {
                    // Assign the "admin" role if not already assigned
                    if (!await _userManager.IsInRoleAsync(user, "Admin"))
                    {
                        await _userManager.AddToRoleAsync(user, "Admin");
                    }
                }
                else
                {
                    // Assign the "user" role if not already assigned
                    if (!await _userManager.IsInRoleAsync(user, "User"))
                    {
                        await _userManager.AddToRoleAsync(user, "User");
                    }
                }

                var token = await GenerateJwtToken(user);

                // Set the token in the response body for client-side handling
                return Ok(new
                {
                    accessToken = token,
                    refreshToken = "dummyRefreshToken", // Replace with actual refresh token logic
                    userName = user.UserName,
                    email = user.Email
                });
            }

            return Unauthorized(new { Message = "Invalid login attempt." });
        }


        private async Task<string> GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JWT:SigninKey"]);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.Email) // Include email claim
    };

            // Retrieve roles for the user and add them to claims
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Adjust as necessary
                Audience = _configuration["JWT:Audience"], // Set the audience claim
                Issuer = _configuration["JWT:Issuer"], // Set the issuer claim
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
