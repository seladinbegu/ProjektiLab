using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace inpositionlibrary.Models
{
    public class Punetori
    {

        [Key]
        public int Id{get; set;}
        public string Emri{get; set;}
        public DateOnly Mbarimi_iKontrates{get; set;}
        public string Pozita{get; set;}
          // Foreign key property
        [ForeignKey("Bibloteka")]
        public string BiblotekaPika { get; set; }

        // Navigation property
        public Bibloteka Bibloteka { get; set; } 
    }
}