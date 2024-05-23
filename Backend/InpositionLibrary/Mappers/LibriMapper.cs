using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Libri;
using InpositionLibrary.Models;

namespace InpositionLibrary.Mappers
{
    public static class LibriMapper
    {
        public static LibriDto toLibriDto(this Libri libriModel)
        {
            return new LibriDto{  
                Id = libriModel.Id,
                Titulli = libriModel.Titulli,
                Autori = libriModel.Autori,
                Pika = libriModel.Pika
                      };
        }

          public static Libri toLibriFromCreateDto(this CreateLibriDto libriDto){
            return new Libri
            {
                Titulli = libriDto.Titulli,
                Autori = libriDto.Autori,
                Pika = libriDto.Pika
            };

          }
    }
}