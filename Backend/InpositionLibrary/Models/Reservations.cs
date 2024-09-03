using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InpositionLibrary.Models;
[Table("Reservations")]
public class Reservations
{public int Id { get; set; }
    public string UserId { get; set; }
    public int LibriId { get; set; }
    public DateTime ReservationDate { get; set; }

    // Navigation properties
    public User User { get; set; }
    public Libri Libri { get; set; }
}
