using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class RootConfigModel
    {
        public int Id { get; set; }
        public int RootId { get; set; }
        public int ParamKeyId { get; set; }
        public string ParamValue { get; set; }
        public bool isActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
    }
}
