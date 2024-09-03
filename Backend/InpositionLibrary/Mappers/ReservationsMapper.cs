using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Punetori;
using InpositionLibrary.DTOs.Reservations;
using InpositionLibrary.Models;

namespace InpositionLibrary.Mappers
{
    public static class ReservationsMapper
    {
          public static ReservationsDto toReservationsDto(this Reservations reservationsModel)
        {
            return new ReservationsDto{  
                Id = reservationsModel.Id,
                UserId = reservationsModel.UserId,
                LibriId = reservationsModel.LibriId,
                ReservationDate = reservationsModel.ReservationDate
                      };
        }

          public static Reservations toReservationsFromCreateDto(this ReservationsCreateDto reservationsDto){
            return new Reservations
            {
                UserId = reservationsDto.UserId,
                LibriId = reservationsDto.LibriId,
                ReservationDate = reservationsDto.ReservationDate
            };

          }
    

    }
}