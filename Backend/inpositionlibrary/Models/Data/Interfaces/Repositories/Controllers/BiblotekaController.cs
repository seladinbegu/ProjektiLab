using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace inpositionlibrary.Models.Data.Interfaces.Repositories.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BiblotekaController : ControllerBase
    {
         private readonly IBiblotekaRepository _biblotekaRepository;
        public BiblotekaController(IBiblotekaRepository biblotekaRepository)
        {
            _biblotekaRepository = biblotekaRepository;
        }



         [HttpGet]
        public IActionResult GetAllBibloteka()
        {
            var products = _biblotekaRepository.GetAllBibloteka();
            return Ok(products);
        }







         [HttpGet("{id}")]
        public IActionResult GetBiblotekaById(string pika)
        {
            var bibloteka = _biblotekaRepository.GetBiblotekaById(pika);
            if (bibloteka == null)
            {
                return NotFound();
            }
            return Ok(bibloteka);
        }








         [HttpPost]
        public IActionResult AddBibloteka([FromBody] Bibloteka bibloteka)
        {
            if (bibloteka == null)
            {
                return BadRequest();
            }
            _biblotekaRepository.AddBibloteka(bibloteka);
            return CreatedAtAction(nameof(GetBiblotekaById), new { pika = bibloteka.Pika }, bibloteka);
        }








         [HttpPut("{id}")]
        public IActionResult UpdateBibloteka(string pika, [FromBody] Bibloteka bibloteka)
        {
            if (bibloteka == null || pika != bibloteka.Pika)
            {
                return BadRequest();
            }
            var existingBibloteka = _biblotekaRepository.GetBiblotekaById(pika);
            if (existingBibloteka == null)
            {
                return NotFound();
            }
            _biblotekaRepository.UpdateBibloteka(bibloteka);
            return NoContent();
        }







         [HttpDelete("{id}")]
        public IActionResult DeleteBibloteka(string pika)
        {
            var existingBibloteka = _biblotekaRepository.GetBiblotekaById(pika);
            if (existingBibloteka == null)
            {
                return NotFound();
            }
            _biblotekaRepository.DeleteBibloteka(pika);
            return NoContent();
        }





        
    }
}