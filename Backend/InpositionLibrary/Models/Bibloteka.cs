using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;

namespace InpositionLibrary.Models
{
    public class Bibloteka
    {
        [Key]
public string Pika { get; set; }  = string.Empty;
public string Adresa { get; set; }  = string.Empty;
public string Kontakti { get; set; }  = string.Empty;

public List<Punetori>Punetori = new List<Punetori>();


  }
}