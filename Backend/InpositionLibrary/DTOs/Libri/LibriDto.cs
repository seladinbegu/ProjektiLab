using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Libri
{
    public class LibriDto
    {
         [Key]
public int Id { get; set; }
public string Titulli { get; set; }  = string.Empty;
public string Autori { get; set; } = string.Empty;
public string Burimi { get; set; } = string.Empty;
 public DateTime? Statusi { get; set; } // Nullable DateTime
public string? Pika{get; set;}
    }
}