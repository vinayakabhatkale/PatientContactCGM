using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class RootModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Accr { get; set; }
        public string Description { get; set; }
        public int AddressId { get; set; }
        public int Contact1 { get; set; }
        public int Contact2 { get; set; }
        public int Contact3 { get; set; }
        public string WebUrl { get; set; }
        public string SupportEmail { get; set; }
        public int isActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
    }
}
