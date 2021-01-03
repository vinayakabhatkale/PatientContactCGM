using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class AuthModel
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string DeviceInfo { get; set; }
    }
}
