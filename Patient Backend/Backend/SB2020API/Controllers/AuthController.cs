using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GS2020API.Filters;
using GS2020API.Models;
using GS2020API.Services;

namespace GS2020API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController 
    {
        //public IAuthService authservice;
   /*     public AuthController(IWebAppUser webAppUser) : base(webAppUser)
        {
          //  this.authservice = authservice;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ResponseModel> Login([FromBody] AuthModel auth)
        {
            var Result = await this.authservice.Login(auth);
            return Result;
        }
        [HttpPost("ResetPassword")]
        public async Task<ResponseModel> ResetPassword([FromBody] AuthModel auth)
        {
            auth.UserId = _webAppUser.LoggedInUserId.ToString();
            var Result = await this.authservice.ResetPassword(auth);
            return Result;
        }
        [HttpPost("ForgotPassword")]
        public async Task<ResponseModel> ForgotPassword([FromBody] AuthModel auth)
        {
            var Result = await this.authservice.ForgotPassword(auth);
            return Result;
        }

     */  

    }
}