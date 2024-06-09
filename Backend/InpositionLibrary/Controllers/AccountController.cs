using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Account;
using InpositionLibrary.Interfaces;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InpositionLibrary.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Lexuesi> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<Lexuesi> _signInManager;
        public AccountController(UserManager<Lexuesi> userManager, ITokenService tokenService, SignInManager<Lexuesi> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

  [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto loginDto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());

    if (user == null)
        return Unauthorized("Invalid Username!");

    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

    if (!result.Succeeded)
        return Unauthorized("Username not found/Password incorrect");

    var token = _tokenService.CreateToken(user);

#pragma warning disable CS8601 // Possible null reference assignment.
            var newUserDto = new NewUserDto
    {
        UserName = user.UserName,
        Email = user.Email,
        Token = token
    };
#pragma warning restore CS8601 // Possible null reference assignment.

            return Ok(newUserDto);
}



     [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
{
    try
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var lexuesi = new Lexuesi
        {
            
            UserName = registerDto.Username,
            Email = registerDto.Email
        };
#pragma warning disable CS8604 // Possible null reference argument.
                var createdUser = await _userManager.CreateAsync(lexuesi, registerDto.Password);
#pragma warning restore CS8604 // Possible null reference argument.

                if (createdUser.Succeeded)
        {
            var roleResult = await _userManager.AddToRoleAsync(lexuesi, "User");
            if (roleResult.Succeeded)
            {
#pragma warning disable CS8601 // Possible null reference assignment.
                        return Ok(
                    new NewUserDto
                    {
                        UserName = lexuesi.UserName,
                        Email = lexuesi.Email,
                        Token = _tokenService.CreateToken(lexuesi)
                    }
                );
#pragma warning restore CS8601 // Possible null reference assignment.
                    }
            else
            {
                return StatusCode(500, roleResult.Errors);
            }
        }
        else
        {
            return StatusCode(500, createdUser.Errors);
        }
    }
    catch (Exception e)
    {
        return StatusCode(500, e);
    }
}



[HttpGet("users")]
public async Task<IActionResult> GetUsers()
{
    try
    {
        var users = await _userManager.Users.ToListAsync(); // Fetch all users from the database
        return Ok(users); // Return users as JSON
    }
    catch (Exception e)
    {
        return StatusCode(500, e);
    }
}




   [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                    return NotFound();

                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                    return Ok();

                return StatusCode(500, result.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

       

        
    }
}