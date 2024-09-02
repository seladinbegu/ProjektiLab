using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Punetori;
using InpositionLibrary.Models;

namespace InpositionLibrary.Mappers
{
    public static class PunetoriMapper
    {
          public static PunetoriDto toPunetoriDto(this Punetori punetoriModel)
        {
            return new PunetoriDto{  
                Id = punetoriModel.Id,
                Emri = punetoriModel.Emri,
                Pozita = punetoriModel.Pozita,
                BiblotekaId = punetoriModel.BiblotekaId
                      };
        }

          public static Punetori toPunetoriFromCreateDto(this PunetoriCreateDto punetoriDto){
            return new Punetori
            {
                Emri = punetoriDto.Emri,
                Pozita = punetoriDto.Pozita,
                BiblotekaId = punetoriDto.BiblotekaId
            };

          }
    

    }
}