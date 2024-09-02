using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace InpositionLibrary.Models
{
    public class User : IdentityUser
    {
    public ICollection<Reservations> Reservations { get; set; }

    }
}