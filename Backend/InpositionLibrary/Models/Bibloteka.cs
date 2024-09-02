using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Bibloteka
    {
        [Key]
         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Ensures ID auto-increment

        public int Id { get; set; }
        public string Pika { get; set; } = string.Empty;
        public string Adresa { get; set; } = string.Empty;
         public string Kontakti { get; set; } = string.Empty;
         public List<Punetori> Punetoret {get; set; } = new List<Punetori>(); 
                  public List<Libri> Librat {get; set; } = new List<Libri>(); 


    }
}