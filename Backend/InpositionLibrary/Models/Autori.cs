using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.Models
{
    public class Autori
    {
         [Key]
public int Id { get; set; }
public string Emri { get; set; }  = string.Empty;
public int LibriId {get; set;}

public Libri? Libri{get; set;}

  }
    }