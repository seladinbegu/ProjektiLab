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
    // Directly map and save the new book
    var libriModel = libriDto.toLibriFromCreateDto();
    _context.Libri.Add(libriModel);
    _context.SaveChanges();

    // Return the created book's data with a 201 Created status
    return CreatedAtAction(nameof(GetById), new { id = libriModel.Id }, libriModel.toLibriDto());
}



[HttpPut("{id}")]
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
    libriModel.Statusi = updateDto.Statusi;
    libriModel.BiblotekaId = updateDto.BiblotekaId; // Ensure this is updated

    _context.SaveChanges();
    return Ok(libriModel.toLibriDto());
}

[HttpPost("{id}/liro")]
[Authorize(Roles = "Admin")]
public IActionResult LiroBook(int id)
{
    var libriModel = _context.Libri.FirstOrDefault(b => b.Id == id);
    if (libriModel == null)
    {
        return NotFound();
    }

    // Update the status to "I Lirë"
    libriModel.Statusi = "I Lirë";

    _context.SaveChanges();
    return Ok(libriModel.toLibriDto());
}



 [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var libri = _context.Libri.FirstOrDefault(b => b.Id == id);
            if (libri == null)
            {
                return NotFound();
            }
            return Ok(libri.toLibriDto());
        }

       [HttpGet("GetTitulliById/{id}")]
public IActionResult GetTitulliById(int id)
{
    // Find the Libri by its Id and select only the Titulli
    var libri = _context.Libri.FirstOrDefault(l => l.Id == id);

    if (libri == null)
    {
        return NotFound($"Libri with Id {id} not found.");
    }

    return Ok(libri.Titulli); // Return only the Titulli
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