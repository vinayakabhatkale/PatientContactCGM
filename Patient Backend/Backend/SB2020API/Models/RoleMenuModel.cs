using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class RoleMenuModel
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int MenuId { get; set; }
        public int sequence { get; set; }
        public bool isActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
    }
}
