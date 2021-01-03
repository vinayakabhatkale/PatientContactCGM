using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class MenuModel
    {
        public int Id { get; set; }
        public string menuname { get; set; }
        public string routeurl { get; set; }
        public string description { get; set; }
        public string displayname { get; set; }
        public bool isactive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }

        public bool isquoteaccessible { get; set; }
    }
}
