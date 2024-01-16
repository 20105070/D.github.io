/*UniversityController.cs - Daniel Syrén (20105070)*/
using ConsoleApp1.Data;
using ConsoleApp1.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace YouNiversityApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UniversityController : ControllerBase
    {

        private readonly YouNiversityContext _context;

        /*UniversityController(YouNiversityContext context) sets the value of _context.*/
        public UniversityController(YouNiversityContext context)
        {
            _context = context;
        }

        [HttpGet("GetUniversities")]
        /*GetUniversities() loads all the universities from the database and returns them to the Angular front-end.*/
        public async Task<IEnumerable<University>> GetUniversities()
        {
            var universities = await _context.Universities
                .ToListAsync();
            return universities;
        }

        [HttpDelete("DeleteUniversity/{name}")]
        /*DeleteUniversity(string name) deletes the university from the database with the name of name.*/
        public async Task<IActionResult> DeleteUniversity(string name)
        {
            var removeUni = await _context.Universities.Where(u => u.Name == name).FirstOrDefaultAsync();
            if (removeUni != null)
            {
                _context.Universities.Remove(removeUni);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }

        [HttpPost("PostUniversity/")]
        /*PostUniversity([FromBody] University university) inserts university into the database.*/
        public async Task<IActionResult> PostUniversity([FromBody] University university)
        {
            var isUni = await _context.Universities.AnyAsync(u => u.Name == university.Name);
            if (!isUni)
            {
                await _context.Universities.AddAsync(university);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }

    }

}
