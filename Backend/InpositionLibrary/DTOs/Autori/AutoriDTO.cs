using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Autori
{
    public class AutoriDto
    {
         [Key]
public int Id { get; set; }
public string Emri { get; set; }  = string.Empty;
public int LibriId {get; set;}
    }
}