using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Libri;
using InpositionLibrary.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InpositionLibrary.Controllers
{
      [Route("api/[Controller]")]
    [ApiController]
    public class LibriController: ControllerBase
    {
           private readonly ApplicationDbContext _context;
        public LibriController(ApplicationDbContext context)
        {
            _context = context;
        }











        [HttpGet]
        public IActionResult Get(){
            var libri = _context.Libri.ToList().Select(s => s.toLibriDto());
            return Ok(libri);
        }









    [HttpPost]
[Authorize(Roles = "Admin")]
public IActionResult Create([FromBody] LibriCreateDto libriDto)
{
    if (libriDto == null)
    {
        return BadRequest("Invalid data.");
    }

    var libriModel = libriDto.toLibriFromCreateDto();
    _context.Libri.Add(libriModel);
    _context.SaveChanges();
    return CreatedAtAction(nameof(Get), new { Id = libriModel.Id }, libriModel.toLibriDto());
}



[HttpPut]
[Route("{id}")]
public IActionResult Update([FromRoute] int id, [FromBody] LibriUpdateDto updateDto)
{
    var libriModel = _context.Libri.FirstOrDefault(b => b.Id == id);
    if (libriModel == null)
    {
        return NotFound();
    }

    libriModel.Titulli = updateDto.Titulli;
    libriModel.Autori = updateDto.Autori;
    libriModel.Burimi = updateDto.Burimi;

    // Update the status to the new status provided in the request
    libriModel.Statusi = updateDto.Statusi;

    _context.SaveChanges();
    return Ok(libriModel.toLibriDto());
}








        [HttpDelete]
                [Authorize(Roles = "Admin")] // Restrict this action to admin users

        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var libriModel = _context.Libri.FirstOrDefault(b => b.Id == id);
            if(libriModel == null){
                return NotFound();
            }
            _context.Libri.Remove(libriModel);
            _context.SaveChanges();

            return NoContent();

        }


        [HttpGet("random")]
public IActionResult GetRandomBooks()
{
    var allBooks = _context.Libri.ToList();
    var random = new Random();
    
    // Select distinct book titles
    var distinctTitles = allBooks.Select(book => book.Titulli).Distinct().ToList();

    // Shuffle the distinct titles
    distinctTitles = distinctTitles.OrderBy(x => random.Next()).ToList();

    // Select a random set of books for each distinct title
    var selectedBooks = new List<LibriDto>();
    foreach (var title in distinctTitles)
    {
        var book = allBooks.FirstOrDefault(b => b.Titulli == title);
        if (book != null)
        {
            selectedBooks.Add(book.toLibriDto());
        }
    }

    // Take the first 3 unique books
    selectedBooks = selectedBooks.Take(3).ToList();

    return Ok(selectedBooks);
}

        
    }
}