using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}