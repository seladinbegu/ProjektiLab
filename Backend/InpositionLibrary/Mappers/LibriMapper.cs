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
                Burimi = libriModel.Burimi,
                Statusi = libriModel.Statusi,
              BiblotekaId = libriModel.BiblotekaId // Make sure this field is set


                      };
        }

          public static Libri toLibriFromCreateDto(this LibriCreateDto libriDto){
            return new Libri
            {
                 Titulli = libriDto.Titulli,
                Autori = libriDto.Autori,
                Burimi = libriDto.Burimi,
                Statusi = libriDto.Statusi,
             BiblotekaId = libriDto.BiblotekaId // Make sure this field is set

            };
            
    }
       public static Libri ToLibriFromUpdateDto(this LibriUpdateDto libriUpdateDto)
    {
        if (libriUpdateDto == null) throw new ArgumentNullException(nameof(libriUpdateDto));

        return new Libri
        {
            Titulli = libriUpdateDto.Titulli,
            Autori = libriUpdateDto.Autori,
            Burimi = libriUpdateDto.Burimi,
            Statusi = libriUpdateDto.Statusi,
            BiblotekaId = libriUpdateDto.BiblotekaId
        };
    }
}
}