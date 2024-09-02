using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Libri
{
    public class LibriUpdateDto
    {
        public string Titulli { get; set; }  = string.Empty;
public string Autori { get; set; } = string.Empty;
public string Burimi { get; set; } = string.Empty;
 public string Statusi { get; set; } = string.Empty;
      public int BiblotekaId { get; set; }  // This should match the type used for the Bibloteka Id

    }
}