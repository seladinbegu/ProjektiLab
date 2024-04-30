using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Models;

namespace InpositionLibrary.DTOs.Bibloteka
{
    public class BiblotekaDto
    {
        
        [Key]
public string Pika { get; set; }  = string.Empty;
public string Adresa { get; set; }  = string.Empty;
public string Kontakti { get; set; }  = string.Empty;


    }
}