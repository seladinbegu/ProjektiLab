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
        public string Pika {get; set;} = string.Empty;

        public string Adresa {get; set;} = string.Empty;

        public string Kontakti {get; set;} = string.Empty;

        public int NumriPunetoreve {get; set;}
    }
}