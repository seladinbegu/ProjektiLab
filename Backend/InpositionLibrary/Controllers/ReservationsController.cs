using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InpositionLibrary.Controllers
{
    
        [ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ReservationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Reservations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reservations>>> GetReservations()
    {
        return await _context.Reservations
            .Include(r => r.Libri)
            .Include(r => r.User)
            .ToListAsync();
    }

    // GET: api/Reservations/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Reservations>> GetReservation(int id)
    {
        var reservation = await _context.Reservations
            .Include(r => r.Libri)
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.LibriId == id && r.UserId == User.Identity.Name); // Assuming you're using the logged-in user's ID

        if (reservation == null)
        {
            return NotFound();
        }

        return reservation;
    }

     [HttpGet("GetUserByUsername")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

    // POST: api/Reservations
    [HttpPost]
    public async Task<ActionResult<Reservations>> PostReservation(Reservations reservation)
    {
        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetReservation", new { id = reservation.LibriId }, reservation);
    }

    // DELETE: api/Reservations/5
    [HttpDelete("{userId}/{libriId}")]
    public async Task<IActionResult> DeleteReservation(string userId, int libriId)
    {
        var reservation = await _context.Reservations
            .FirstOrDefaultAsync(r => r.UserId == userId && r.LibriId == libriId);

        if (reservation == null)
        {
            return NotFound();
        }

        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [HttpGet("HasRecentReservation/{userId}")]
    public async Task<ActionResult<bool>> HasRecentReservation(string userId)
    {
        var oneMonthAgo = DateTime.Now.AddMonths(-1);

        var hasRecentReservation = await _context.Reservations
            .AnyAsync(r => r.UserId == userId && r.ReservationDate >= oneMonthAgo);

        return Ok(hasRecentReservation);
    }
    
}

    
}