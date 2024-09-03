using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Reservations;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Authorization;
using InpositionLibrary.Mappers;

namespace InpositionLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var reservations = await _context.Reservations
                .Include(r => r.Libri) // Optional: Include related data if needed
                .Include(r => r.User)
                .ToListAsync();

            var reservationDtos = reservations.Select(s => s.toReservationsDto());
            return Ok(reservationDtos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ReservationsCreateDto reservationsDto)
        {
            if (reservationsDto == null)
            {
                return BadRequest("Invalid data.");
            }

            var reservationsModel = reservationsDto.toReservationsFromCreateDto();
            _context.Reservations.Add(reservationsModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { Id = reservationsModel.Id }, reservationsModel.toReservationsDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ReservationsUpdateDto updateDto)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            reservation.UserId = updateDto.UserId;
            reservation.LibriId = updateDto.LibriId;
            reservation.ReservationDate = updateDto.ReservationDate;

            await _context.SaveChangesAsync();
            return Ok(reservation.toReservationsDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("HasRecentReservation/{userId}")]
        public async Task<ActionResult<bool>> HasRecentReservation([FromRoute] string userId)
        {
            var oneMonthAgo = DateTime.Now.AddMonths(-1);

            var hasRecentReservation = await _context.Reservations
                .AnyAsync(r => r.UserId == userId && r.ReservationDate >= oneMonthAgo);

            return Ok(hasRecentReservation);
        }

        [HttpGet("GetByUserAndBook/{userId}/{libriId}")]
        public async Task<ActionResult<ReservationsDto>> GetByUserAndBook([FromRoute] string userId, [FromRoute] int libriId)
        {
            var reservation = await _context.Reservations
                .Where(r => r.UserId == userId && r.LibriId == libriId)
                .FirstOrDefaultAsync();

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation.toReservationsDto());
        }

        [HttpGet("GetByUsername")]
        public async Task<IActionResult> GetByUsername([FromQuery] string username)
        {
           if (string.IsNullOrWhiteSpace(username))
        {
            return BadRequest("Username cannot be empty");
        }

        var user = await _context.Users
            .Where(u => u.UserName == username)
            .Select(u => new { id = u.Id })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        return Ok(user);
        }
    }
}
