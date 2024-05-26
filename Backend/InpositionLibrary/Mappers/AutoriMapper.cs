using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Autori;
using InpositionLibrary.Models;

namespace InpositionLibrary.Mappers
{
    public static class AutoriMapper
    {

         public static AutoriDto toAutoriDto(this Autori autoriModel)
        {
            return new AutoriDto{
                Id = autoriModel.Id,
                Emri = autoriModel.Emri,
                LibriId = autoriModel.LibriId
            };
        }

        public static Autori toAutoriFromCreateDto(this CreateAutoriRequestDto autoriDto)
        {
            return new Autori{
            Emri = autoriDto.Emri,
            LibriId = autoriDto.LibriId,
            };
        }
        
    }
}