/*University.cs - Daniel Syrén (20105070)*/
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Entities
{
    public class University
    {
        [Key]
        public string Name { get; set; }
        public string WebPage { get; set; }
    }

}
