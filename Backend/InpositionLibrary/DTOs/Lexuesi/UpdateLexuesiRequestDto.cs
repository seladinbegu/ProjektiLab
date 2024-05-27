using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Lexuesi
{
    public class UpdateLexuesiRequestDto
    {
        [Key]
        public int Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string EmriPerdoruesit { get; set; } = string.Empty;
        public string Fjalekalimi { get; set; } = string.Empty;
         public string NumriTelefonit { get; set; } = string.Empty;

    }
}