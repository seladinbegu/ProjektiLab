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
        public int ID_Punetori { get; set; }

        public string Emri { get; set; } = string.Empty;


        public DateOnly Mbarimi_iKontrates { get; set; }

        public string Pozicioni { get; set; } = string.Empty;

           [ForeignKey("Pika")]
        public string BiblotekaPika { get; set; } = string.Empty;

       
    }
}