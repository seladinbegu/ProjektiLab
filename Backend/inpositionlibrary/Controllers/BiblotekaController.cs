using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using inpositionlibrary.Data;
using Microsoft.AspNetCore.Mvc;

namespace inpositionlibrary.Controllers
{
   [ApiController]
[Route("api/[controller]")] // Route template with [controller] token
public class BiblotekaController : ControllerBase
{
    private readonly ApplicationDBContext context;

    public BiblotekaController(ApplicationDBContext context)
    {
        this.context = context;
    }

    // GET: api/Bibloteka
    [HttpGet]
    public IActionResult Get()
    {
        var bibloteka = context.Bibloteka.ToList();
        return Ok(bibloteka);
    }

    // GET: api/Bibloteka/{id}
    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] string id)
    {
        var bibloteka = context.Bibloteka.Find(id);
        return bibloteka == null ? (IActionResult)NotFound() : Ok(bibloteka);
    }
}

}