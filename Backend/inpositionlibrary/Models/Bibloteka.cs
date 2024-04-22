using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace inpositionlibrary.Models
{
    public class Bibloteka
    {

        [Key]
        public string Pika {get; set;}
        public string Adresa {get; set;}
         public string Kontakti {get; set;}

    }
}