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
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage.Blob;
namespace GS2020API.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AllowController : ControllerBase
    {

        private IApplicationService service;
        private IConfiguration configuration;
        public AllowController(IConfiguration iconfig, IApplicationService service)
        {
            configuration = iconfig;
            this.service = service;
        }

        [AllowAnonymous]
        [HttpPost("AppointmentCreate")]
        public Task<ResponseModel> AppointmentCreate(ApplicationModel model)
        {
            var Result = this.service.Add(model);
            return Result;
        }

        [AllowAnonymous]
        [HttpPut("AppointmentUpdate")]
        public Task<ResponseModel> AppointmentUpdate(ApplicationModel model)
        {
            var Result = this.service.Edit(model);
            return Result;
        }

        [AllowAnonymous]
        [HttpPost("AppointmentGetAll")]
        public Task<ResponseModel> AppointmentGetAll(ApplicationFilter model)
        {
            var Result = this.service.GetAll(model);
            return Result;
        }

        [AllowAnonymous]
        [HttpGet("AppointmentGetById")]
        public Task<ResponseModel> AppointmentGetById(int Id)
        {
            var Result = this.service.GetById(Id);
            return Result;
        }

        [AllowAnonymous]
        [HttpDelete("DeleteById")]
        public Task<ResponseModel> DeleteById(int Id)
        {
            var Result = this.service.DeleteById(Id);
            return Result;
        }

        

    }
}