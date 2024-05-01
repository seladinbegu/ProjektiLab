using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Bibloteka;
using InpositionLibrary.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class BiblotekaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public BiblotekaController(ApplicationDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get(){
            var bibloteka = _context.Bibloteka.ToList().Select(s => s.toBiblotekaDto());
            return Ok(bibloteka);
        }


        [HttpPost]
        public IActionResult Create([FromBody] CreateBiblotekaRequestDto biblotekaDto)
        {
            var biblotekaModel = biblotekaDto.toBiblotekaFromCreateDto();
            _context.Bibloteka.Add(biblotekaModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new{Pika = biblotekaModel.Pika}, biblotekaModel.toBiblotekaDto());
        }




        [HttpPut]
        [Route("{pika}")]
        public IActionResult Update([FromRoute] string pika, [FromBody] UpdateBiblotekaRequestDto updateDto){
            var biblotekaModel = _context.Bibloteka.FirstOrDefault(b => b.Pika == pika);
            if(biblotekaModel == null){
                return NotFound();
            }
            biblotekaModel.Pika = updateDto.Pika;
            biblotekaModel.Adresa = updateDto.Adresa;
            biblotekaModel.Kontakti = updateDto.Kontakti;

            _context.SaveChanges();
            return Ok(biblotekaModel.toBiblotekaDto());
        }






        [HttpDelete]
        [Route("{pika}")]
        public IActionResult Delete([FromRoute] string pika)
        {
            var biblotekaModel = _context.Bibloteka.FirstOrDefault(b => b.Pika == pika);
            if(biblotekaModel == null){
                return NotFound();
            }
            _context.Bibloteka.Remove(biblotekaModel);
            _context.SaveChanges();

            return NoContent();

        }



    }
}