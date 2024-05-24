using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Autori;
using InpositionLibrary.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
     [Route("api/[Controller]")]
     [ApiController]
    public class AutoriController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public AutoriController(ApplicationDBContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public IActionResult Get(){
            var autori = _context.Autori.ToList().Select(s => s.toAutoriDto());
            return Ok(autori);
        }


        [HttpPost]
        public IActionResult Create([FromBody] CreateAutoriRequestDto autoriDto)
        {
            var autoriModel = autoriDto.toAutoriFromCreateDto();
            _context.Autori.Add(autoriModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new{Id = autoriModel.Id}, autoriModel.toAutoriDto());
        }






        
        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateAutoriRequestDto updateDto){
            var autoriModel = _context.Autori.FirstOrDefault(b => b.Id == id);
            if(autoriModel == null){
                return NotFound();
            }
            autoriModel.Id = updateDto.Id;
            autoriModel.Emri = updateDto.Emri;
            autoriModel.LibriId = updateDto.LibriId;

            _context.SaveChanges();
            return Ok(autoriModel.toAutoriDto());
        }











        
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var autoriModel = _context.Autori.FirstOrDefault(b => b.Id == id);
            if(autoriModel == null){
                return NotFound();
            }
            _context.Autori.Remove(autoriModel);
            _context.SaveChanges();

            return NoContent();

        }




    }
}