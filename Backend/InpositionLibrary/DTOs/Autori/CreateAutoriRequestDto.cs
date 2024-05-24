using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InpositionLibrary.DTOs.Autori
{
    public class CreateAutoriRequestDto
    {
        public string Emri { get; set; }  = string.Empty;
        public int Id { get; internal set; }

        internal Models.Autori toAutoriFromCreateDTO()
        {
            throw new NotImplementedException();
        }
    }
}