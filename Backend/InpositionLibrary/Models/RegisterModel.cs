using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class RegisterModel
    {
          [Required(ErrorMessage = "Name is required")]
        public string Emri { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string EmriPerdoruesit { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Fjalekalimi { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        public string NumriTelefonit { get; set; }

        public Bibloteka? Bibloteka { get; set; }
    }
}