using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Reservation;
using InpositionLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InpositionLibrary.Controllers
{
      [Route("api/[Controller]")]
    [ApiController]
    public class ReservationController: ControllerBase
    {
         private readonly ApplicationDBContext _context;

    public ReservationController(ApplicationDBContext context)
    {
        _context = context;
    }

       [HttpPost]
        public IActionResult CreateReservation([FromBody] ReservationDto reservationDto)
        {
            try
            {
                // Create a new Reservation object from the DTO
                var reservation = new Reservation
                {
                    UserId = reservationDto.UserId,
                    BookId = reservationDto.BookId,
                    ReservedAt = DateTime.UtcNow // Use UTC time to store reservation timestamp
                };

                // Add the reservation to the database
                _context.Reservation.Add(reservation);
                _context.SaveChanges();

                return Ok("Reservation created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating reservation: {ex.Message}");
            }
        }
    }
}