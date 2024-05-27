using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using InpositionLibrary.Data;
using InpositionLibrary.DTOs.Libri;
using InpositionLibrary.Mappers;

namespace InpositionLibrary.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class LibriController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public LibriController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var libri = _context.Libri.ToList().Select(s => s.toLibriDto());
            return Ok(libri);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var libri = _context.Libri.Find(id);

            if (libri == null)
            {
                return NotFound();
            }
            return Ok(libri.toLibriDto());

        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateLibriDto updateDto)
        {
            var libriModel = _context.Libri.FirstOrDefault(p => p.Id == id);
            if (libriModel == null)
            {
                return NotFound();
            }
            libriModel.Id = updateDto.Id;
            libriModel.Titulli = updateDto.Titulli;
            libriModel.Autori = updateDto.Autori;
            libriModel.Burimi = updateDto.Burimi;
            libriModel.Statusi = updateDto.Statusi;
            libriModel.Pika = updateDto.Pika;


            _context.SaveChanges();
            return Ok(libriModel.toLibriDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateLibriDto libriDto)
        {
            var libriModel = libriDto.toLibriFromCreateDto();
            _context.Libri.Add(libriModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { Id = libriModel.Id }, libriModel.toLibriDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var libriModel = _context.Libri.FirstOrDefault(p => p.Id == id);
            if (libriModel == null)
            {
                return NotFound();
            }
            _context.Libri.Remove(libriModel);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost("upload")]
        public IActionResult UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File not selected or empty");
            }

            try
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return Ok(new { filePath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error uploading file: {ex.Message}");
            }
        }
    }
}
