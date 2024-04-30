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



    }
}