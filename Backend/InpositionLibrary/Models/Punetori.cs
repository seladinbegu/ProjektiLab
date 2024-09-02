using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Punetori
    {
        public int Id { get; set; }
        public string Emri { get; set; }= string.Empty;
        public string Pozita { get; set; }= string.Empty;
        public int BiblotekaId { get; set; }
        public Bibloteka Bibloteka {get; set;}


    }
}