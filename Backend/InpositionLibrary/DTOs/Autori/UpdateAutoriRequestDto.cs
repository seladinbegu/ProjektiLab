using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Autori
{
    public class UpdateAutoriRequestDto
    {
        [Key]
public int Id { get; set; }
public string Emri { get; set; }  = string.Empty;
    }
}