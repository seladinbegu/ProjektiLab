using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InpositionLibrary.Data; // Update with your actual namespace
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Authorization; // Update with your actual namespace

[Route("api/[controller]")]
 [ApiController]
 [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/User/GetAllUsers
    [HttpGet("GetAllUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _context.Users.ToListAsync(); // Fetch all users from the DbSet
            return Ok(users);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET: api/User/GetUserById/{id}
    [HttpGet("GetUserById/{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); // Return 404 if user is not found
            }

            return Ok(user.UserName);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // PUT: api/User/UpdateUser/{id}
    [HttpPut("UpdateUser/{id}")]
    public async Task<IActionResult> UpdateUser(string id, User updatedUser)
    {
        if (id != updatedUser.Id)
        {
            return BadRequest("User ID mismatch."); // Return 400 if ID doesn't match
        }

        try
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); // Return 404 if user is not found
            }

            // Update user properties
            user.UserName = updatedUser.UserName;
            user.Email = updatedUser.Email;
            // Add other properties to update as needed

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on success
        }
        catch (DbUpdateConcurrencyException)
        {
            return StatusCode(409, "Conflict occurred while updating the user."); // Return 409 if there's a concurrency issue
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // DELETE: api/User/DeleteUser/{id}
    [HttpDelete("DeleteUser/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); // Return 404 if user is not found
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on success
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
