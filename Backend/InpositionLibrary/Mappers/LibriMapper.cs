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
                Pika = libriModel.Pika,
                Burimi = libriModel.Burimi,
                Statusi = libriModel.Statusi
                      };
        }

          public static Libri toLibriFromCreateDto(this CreateLibriRequestDto libriDto){
            return new Libri
            {
                Titulli = libriDto.Titulli,
                Autori = libriDto.Autori,
                Pika = libriDto.Pika,
                Burimi = libriDto.Burimi,
                Statusi = libriDto.Statusi
            };


            

          }
    
    }
}