using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Autori
{
    public class AutoriDTO
    {
           [Key]
public int Id { get; set; }
public string Emri { get; set; }  = string.Empty;

public string? Libri{get; set;}

        internal static Models.Autori toAutoriFromCreateDto()
        {
            throw new NotImplementedException();
        }

        internal static Models.Autori toAutoriFromCreateDTO()
        {
            throw new NotImplementedException();
        }
    }
}