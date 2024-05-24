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
            var autori = _context.Autori.ToList().Select(s => s.toAutoriDTO());
            return Ok(autori);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateAutoriRequestDto AutoriDto)
        {
            var autoriModel = AutoriDto.toAutoriFromCreateDTO();
            _context.Autori.Add(autoriModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new{Pika = autoriModel.Id}, autoriModel.toAutoriDTO());
        }

         [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int Id, [FromBody] UpdateAutoriRequestDto updateDto){
            var autoriModel = _context.Autori.FirstOrDefault(b => b.Id == Id);
            if(autoriModel == null){
                return NotFound();
            }
            autoriModel.Id = updateDto.Id;
            autoriModel.Emri = updateDto.Emri;

            _context.SaveChanges();
            return Ok(autoriModel.toAutoriDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int Id)
        {
            var autoriModel = _context.Autori.FirstOrDefault(b => b.Id == Id);
            if(autoriModel == null){
                return NotFound();
            }
            _context.Autori.Remove(autoriModel);
            _context.SaveChanges();

            return NoContent();

        }

    }
}