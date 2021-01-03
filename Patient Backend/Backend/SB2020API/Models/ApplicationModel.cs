using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class ApplicationModel
    {

        public int Id { get; set; }
        public int RootId { get; set; }

        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string contact { get; set; }
        public string address { get; set; }
        public DateTime date { get; set; }
        public string gender { get; set; }
        public string bloodgroup { get; set; }

        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
    }
    public class ApplicationFilter
    {
        public DateTime? date { get; set; }
        public string SearchString { get; set; }
    }
}
