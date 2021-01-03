using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class ErrorLogModel
    {
        public int Id { get; set; }
        public int RootId { get; set; }
        public string ClassName { get; set; }
        public string Error { get; set; }
        public string LineNumber { get; set; }
        public bool isActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }

    }
}
