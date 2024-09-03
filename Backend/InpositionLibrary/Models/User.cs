using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace InpositionLibrary.Models
{
    [Table("User")]
    public class User : IdentityUser
    {
public List<Reservations> Reservations {get; set;} = new List<Reservations>();
    }
}