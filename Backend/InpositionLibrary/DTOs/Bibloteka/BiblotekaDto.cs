using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Bibloteka
{
    public class BiblotekaDto
    {
         public int Id { get; set; }
        public string Pika { get; set; } = string.Empty;
        public string Adresa { get; set; } = string.Empty;
        public string Kontakti { get; set; } = string.Empty;
    }
}