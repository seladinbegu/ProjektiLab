using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Lexuesi;
using InpositionLibrary.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
     [Route("api/[Controller]")]
    [ApiController]
    public class LexuesiController : ControllerBase
    {


          private readonly ApplicationDBContext _context;
        public LexuesiController(ApplicationDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get(){
            var lexuesi = _context.Lexuesi.ToList().Select(s => s.toLexuesiDto());
            return Ok(lexuesi);
        }


         [HttpPost]
        public IActionResult Create([FromBody] CreateLexuesiRequestDto lexuesiDto)
        {
            var lexuesiModel = LexuesiDto.toLexuesiFromCreateDto();
            _context.Lexuesi.Add(lexuesiModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new{Id = lexuesiModel.Id}, lexuesiModel.toLexuesiDto());
        }






          [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateLexuesiRequestDto updateDto){
            var lexuesiModel = _context.Lexuesi.FirstOrDefault(b => b.Id == id);
            if(lexuesiModel == null){
                return NotFound();
            }
            lexuesiModel.Id = updateDto.Id;
            lexuesiModel.Emri = updateDto.Emri;
            lexuesiModel.EmriPerdoruesit = updateDto.EmriPerdoruesit;
            lexuesiModel.Fjalekalimi = updateDto.Fjalekalimi;
            lexuesiModel.NumriTelefonit = updateDto.NumriTelefonit;



            _context.SaveChanges();
            return Ok(lexuesiModel.toLexuesiDto());
        }





         [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var lexuesiModel = _context.Lexuesi.FirstOrDefault(b => b.Id == id);
            if(lexuesiModel == null){
                return NotFound();
            }
            _context.Lexuesi.Remove(lexuesiModel);
            _context.SaveChanges();

            return NoContent();

        }
 


    }
}