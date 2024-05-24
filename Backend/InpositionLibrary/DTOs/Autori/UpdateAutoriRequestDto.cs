using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Autori
{
    public class UpdateAutoriRequestDto
    {
        public int Id { get; set; }
public string Emri { get; set; }  = string.Empty;
public int LibriId {get; set;}
    }
}