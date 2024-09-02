using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Punetori
{
    public class PunetoriCreateDto
    {
        public string Emri { get; set; }= string.Empty;
        public string Pozita { get; set; }= string.Empty;
        public int BiblotekaId { get; set; }
    }
}