using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Libri
{
    public class CreateLibriDto
    {
        public string Titulli { get; set; }  = string.Empty;
        public string Autori { get; set; } = string.Empty;
        public string Burimi { get; set; } = string.Empty;
        public string Statusi { get; set; } = string.Empty;
        public string? Pika{get; set;}
    }
}