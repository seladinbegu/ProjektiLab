using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Reservations
    
{
    [Key]
        public int Id { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }

    public int LibriId { get; set; }
    public Libri Libri { get; set; }

    public DateTime ReservationDate { get; set; } // Optional: Additional fields specific to the reservation
}

        
    
}