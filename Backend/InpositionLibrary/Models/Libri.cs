using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;

namespace InpositionLibrary.Models
{
    public class Libri
    {
        [Key]
public int Id { get; set; }
public string Titulli { get; set; }  = string.Empty;
public string Autori { get; set; } = string.Empty;
public string? Pika{get; set;}
public Bibloteka? Bibloteka{get; set;}
  }
}