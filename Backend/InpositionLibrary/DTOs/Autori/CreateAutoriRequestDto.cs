using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Autori
{
    public class CreateAutoriRequestDto
    {
public string Emri { get; set; }  = string.Empty;
public int LibriId {get; set;}
    }
}