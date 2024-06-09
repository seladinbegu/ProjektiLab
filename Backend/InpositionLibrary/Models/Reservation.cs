using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Reservation
    {
        [Key]
     public int Id { get; set; }
    public int UserId { get; set; }
    public int BookId { get; set; }
    public DateTime ReservedAt { get; set; }

    }
}