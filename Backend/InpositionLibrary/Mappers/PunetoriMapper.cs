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
                Pika = punetoriModel.Pika
                      };
        }

          public static Punetori toPunetoriFromCreateDto(this CreatePunetoriRequestDto punetoriDto){
            return new Punetori
            {
                Emri = punetoriDto.Emri,
                Pozita = punetoriDto.Pozita,
                Pika = punetoriDto.Pika
            };

          }
    }
}