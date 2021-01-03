using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{ 
    public class ResponseModel
    {
        public string status { get; set; }
        public object data { get; set; }
        public string message { get; set; }
        public ResponseStatus StatusCode { get; set; }
    }

    public enum ResponseStatus { Success = 1, Failed = 0 }
}
