using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.DTOs.Lexuesi;
using InpositionLibrary.Models;

namespace InpositionLibrary.Mappers
{
    public static class LexuesiMapper
    {
        public static LexuesiDto toLexuesiDto(this Lexuesi lexuesiModel)
        {
            return new LexuesiDto{  
                Id = lexuesiModel.Id,
                Emri = lexuesiModel.Emri,
                EmriPerdoruesit = lexuesiModel.EmriPerdoruesit,
                Fjalekalimi = lexuesiModel.Fjalekalimi,
                NumriTelefonit = lexuesiModel.NumriTelefonit,
                      };
        }


        public static Lexuesi toLexuesiFromCreateDto(this CreateLexuesiRequestDto lexuesiDto){
            return new Lexuesi
            {
                Emri = lexuesiDto.Emri,
                EmriPerdoruesit = lexuesiDto.EmriPerdoruesit,
                Fjalekalimi = lexuesiDto.Fjalekalimi,
                NumriTelefonit = lexuesiDto.NumriTelefonit,
            };

          }
  
        
    }
}