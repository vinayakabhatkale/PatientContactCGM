using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GS2020API.Filters;
using GS2020API.Models;

namespace GS2020API.Controllers
{

    [Authorize]
    public class ApiBaseController : Controller
    {
        public readonly DateTime MINDATE = new DateTime(1753, 1, 1);
        public readonly IWebAppUser _webAppUser;

        public ApiBaseController(IWebAppUser webAppUser)
        {
            _webAppUser = webAppUser;
        }

        public static JObject CreateApiResult(ResponseStatus status = ResponseStatus.Failed, object content = null, string message = null)
        {
            JObject resultDataObject = new JObject();
            resultDataObject.Add("status", Enum.GetName(status.GetType(), status));
            resultDataObject.Add(new JProperty("data", content == null ? null : JsonConvert.DeserializeObject(JsonConvert.SerializeObject(content))));
            resultDataObject.Add("message", message);
            return resultDataObject;
        }
        /// <summary>
    }
}

