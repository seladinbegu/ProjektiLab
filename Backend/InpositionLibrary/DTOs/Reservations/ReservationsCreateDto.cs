using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Reservations
{
    public class ReservationsCreateDto
    {
         public string UserId { get; set; }
    public int LibriId { get; set; }
    public DateTime ReservationDate { get; set; }
    }
}