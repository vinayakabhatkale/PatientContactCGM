using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class RoleModel
    {
        public int Id { get; set; }
        public string RoleCode { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
    }
}
