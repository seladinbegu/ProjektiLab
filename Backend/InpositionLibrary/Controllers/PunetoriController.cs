using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Punetori;
using InpositionLibrary.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
       [Route("api/[Controller]")]
    [ApiController]
      public class PunetoriController : ControllerBase
    {
         private readonly ApplicationDBContext _context;
        public PunetoriController(ApplicationDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get(){
            var punetori = _context.Punetori.ToList().Select(s => s.toPunetoriDto());
            return Ok(punetori);
        }





        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id){
            var punetori = _context.Punetori.Find(id);

            if(punetori == null){
                return NotFound();
            }
            return Ok(punetori.toPunetoriDto());

        }
   [HttpGet("bypika/{pika}")]
public IActionResult GetByPika([FromRoute] string pika)
{
    var punetori = _context.Punetori.Where(p => p.Pika == pika).ToList();

    if (punetori == null || punetori.Count == 0)
    {
        return NotFound();
    }

    return Ok(punetori.Select(p => p.toPunetoriDto()));
}
 [HttpGet("bypozita/{pozita}")]
public IActionResult GetByPozita([FromRoute] string pozita)
{
    var punetori = _context.Punetori.Where(p => p.Pozita == pozita).ToList();

    if (punetori == null || punetori.Count == 0)
    {
        return NotFound();
    }

    return Ok(punetori.Select(p => p.toPunetoriDto()));
}




            [HttpPost]
        public IActionResult Create([FromBody] CreatePunetoriRequestDto punetoriDto)
        {
            var punetoriModel = punetoriDto.toPunetoriFromCreateDto();
            _context.Punetori.Add(punetoriModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new{ Id = punetoriModel.Id}, punetoriModel.toPunetoriDto());
    }
}
}