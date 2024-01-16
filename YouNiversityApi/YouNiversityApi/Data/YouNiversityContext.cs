/*YouNiversityContext.cs - Daniel Syrén (20105070)*/
using ConsoleApp1.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Data
{
    public class YouNiversityContext : DbContext
    {
        public YouNiversityContext(DbContextOptions<YouNiversityContext> options)
            : base(options)
        {

        }

        public DbSet<University> Universities { get; set; }

        /*OnConfiguring(DbContextOptionsBuilder optionsBuilder) creates the connection to the YouNiversity database.*/
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=14-dv1629na\\SQLEXPRESS01;Database =YouNiversity;Integrated Security = true;TrustServerCertificate=True; Connect Timeout=60");
            base.OnConfiguring(optionsBuilder);
        }

    }

}
