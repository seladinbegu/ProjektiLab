using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Bibloteka;
using InpositionLibrary.Models;

namespace InpositionLibrary.Mappers
{
    public static class BiblotekaMapper
    {
        public static BiblotekaDto toBiblotekaDto(this Bibloteka biblotekaModel)
        {
            return new BiblotekaDto{
                Pika = biblotekaModel.Pika,
                Adresa = biblotekaModel.Adresa,
                Kontakti = biblotekaModel.Kontakti
            };
        }

        public static Bibloteka toBiblotekaFromCreateDto(this CreateBiblotekaRequestDto biblotekaDto)
        {
            return new Bibloteka{
            Pika = biblotekaDto.Pika,
            Adresa = biblotekaDto.Adresa,
            Kontakti = biblotekaDto.Kontakti
            };
        }
    }
}