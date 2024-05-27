using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Lexuesi
{
    public class CreateLexuesiRequestDto
    {
                public string Emri { get; set; } = string.Empty;
        public string EmriPerdoruesit { get; set; } = string.Empty;
        public string Fjalekalimi { get; set; } = string.Empty;
         public string NumriTelefonit { get; set; }= string.Empty;

    }
}