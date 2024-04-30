using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Punetori
    {
        [Key]
        public int Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Pozita { get; set; } = string.Empty;
        public string? Pika{get; set;}
        public Bibloteka? Bibloteka{get; set;}


    }
}