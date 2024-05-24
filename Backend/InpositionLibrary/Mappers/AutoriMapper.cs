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
        public static AutoriDTO toAutoriDTO(this Autori autorimodel)
        {
            return new AutoriDTO{
                Id = autorimodel.Id,
                Emri = autorimodel.Emri


            };
        }

        public static Autori toAutoriFromCreateDto(this CreateAutoriRequestDto AutoriDTO)
        {
            return new Autori{
            Id = AutoriDTO.Id,
            Emri = AutoriDTO.Emri
            };
    }
    }
}
