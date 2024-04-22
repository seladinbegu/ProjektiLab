using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace inpositionlibrary.Models.Data.Interfaces.Repositories.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PunetoriController : ControllerBase
    {

         private readonly IPunetoriRepository _punetoriRepository;
        public PunetoriController(IPunetoriRepository punetoriRepository)
        {
            _punetoriRepository = punetoriRepository;
        }




         [HttpGet]
        public IActionResult GetAllPunetori()
        {
            var punetori = _punetoriRepository.GetAllPunetori();
            return Ok(punetori);
        }






         [HttpGet("{id}")]
        public IActionResult GetAllPunetoriById(int id)
        {
            var punetori = _punetoriRepository.GetAllPunetoriById;
            if (punetori == null)
            {
                return NotFound();
            }
            return Ok(punetori);
        }







         [HttpPost]
        public IActionResult AddPunetori([FromBody] Punetori punetori)
        {
            if (punetori == null)
            {
                return BadRequest();
            }
            _punetoriRepository.AddPunetori(punetori);
            return CreatedAtAction(nameof(GetAllPunetoriById), new { id = punetori.Id }, punetori);
        }








        
         [HttpPut("{id}")]
        public IActionResult UpdatePunetori(int id, [FromBody] Punetori punetori)
        {
            if (punetori == null || id != punetori.Id)
            {
                return BadRequest();
            }
            var existingPunetori = _punetoriRepository.GetAllPunetoriById(id);
            if (existingPunetori == null)
            {
                return NotFound();
            }
            _punetoriRepository.UpdatePunetori(punetori);
            return NoContent();
        }













         [HttpDelete("{id}")]
        public IActionResult DeletePunetori(int id)
        {
            var existingPunetori = _punetoriRepository.GetAllPunetoriById(id);
            if (existingPunetori == null)
            {
                return NotFound();
            }
            _punetoriRepository.DeletePunetori(id);
            return NoContent();
        }






        
    }
}