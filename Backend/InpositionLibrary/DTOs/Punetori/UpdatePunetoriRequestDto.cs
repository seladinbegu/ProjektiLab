using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Punetori
{
    public class UpdatePunetoriRequestDto
    {
         public int Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Pozita { get; set; } = string.Empty;
        public string? Pika{get; set;}
    }
}