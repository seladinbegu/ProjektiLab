using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using inpositionlibrary.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inpositionlibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PunetoriController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        public PunetoriController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var punetori = context.Punetori.ToList();
            return Ok(punetori);
        }

        // GET: api/Punetori/id/5
        [HttpGet("id/{id}")]
        public IActionResult GetById(int id)
        {
            var punetori = context.Punetori.Find(id);
            return punetori == null ? (IActionResult)NotFound() : Ok(punetori);
        }

        // GET: api/Punetori/emri/JohnDoe
        [HttpGet("emri/{emri}")] // Endpoints
        public IActionResult GetByName([FromRoute]string emri)
        {
            var punetori = context.Punetori.FirstOrDefault(p => p.Emri == emri);
            return punetori == null ? (IActionResult)NotFound() : Ok(punetori);
        }

       [HttpGet("pika/{pika}")]
public IActionResult GetByPika([FromRoute]string pika)
{
    var punetori = context.Punetori.Where(p => p.BiblotekaPika == pika).ToList();
    return punetori.Count == 0 ? (IActionResult)NotFound() : Ok(punetori);
}

        [HttpGet("pozicioni/{pozicioni}")]
public IActionResult GetByPozicioni([FromRoute]string pozicioni)
{
    var punetori = context.Punetori.Where(p => p.Pozicioni == pozicioni).ToList();
    return punetori.Count == 0 ? (IActionResult)NotFound() : Ok(punetori);
}






  
         }
}
