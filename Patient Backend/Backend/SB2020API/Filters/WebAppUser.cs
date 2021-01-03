using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using GS2020API.Models;

namespace GS2020API.Filters
{
    public class WebAppUser : IWebAppUser
    {
        public string AccessToken
        {
            get;
            set;
        }

        public int LoggedInUserId
        {
            get;
            set;
        }

        public int CurrentRootId
        {
            get;
            set;
        }

        public string CurrentUserId
        {
            get;
            set;
        }

      /*  public int CurrentUserEntityId
        {
            get;
            set;
        }

        public string CurrentUserEntity
        {
            get;
            set;
        } */
        public string IsMobile
        {
            get;
            set;
        }
        public string CurrentWorkerCode
        {
            get;
            set;
        }
        public string CurrentDeviceCode
        {
            get;
            set;
        }

        public string LoggedInRoleCode
        { get; set; }

        public int CurrentRoleId
        { get; set; }

        public WebAppUser(IHttpContextAccessor ihttpContext)
        {
            var httpContext = ihttpContext.HttpContext;
            if (!httpContext.Request.Path.Value.Equals("/api/v1/auth/login", StringComparison.OrdinalIgnoreCase) && !httpContext.Request.Path.Value.Equals("/api/v1/Mobileapp/GenerateOTPForWorker", StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    if (httpContext != null && httpContext.User != null && httpContext.User.Identity.IsAuthenticated)
                    {
                        ClaimsIdentity identity = httpContext.User.Identity as ClaimsIdentity;

                        if (identity.HasClaim(c => c.Type == JwtConstant.UserID))
                        {
                            LoggedInUserId = Convert.ToInt32(identity.Claims.Where(c => c.Type == JwtConstant.UserID).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.RootId))
                        {
                            CurrentRootId = Convert.ToInt32(identity.Claims.Where(c => c.Type == JwtConstant.RootId).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.RoleId))
                        {
                            CurrentRoleId = Convert.ToInt32(identity.Claims.Where(c => c.Type == JwtConstant.RoleId).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.RoleCode))
                        {
                            LoggedInRoleCode = Convert.ToString(identity.Claims.Where(c => c.Type == JwtConstant.RoleCode).SingleOrDefault().Value);
                        }
                       /* if (identity.HasClaim(c => c.Type == JwtConstant.Entity))
                        {
                            CurrentUserEntity = Convert.ToString(identity.Claims.Where(c => c.Type == JwtConstant.Entity).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.EntityId))
                        {
                            CurrentUserEntityId = Convert.ToInt32(identity.Claims.Where(c => c.Type == JwtConstant.EntityId).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.EntityId))
                        {
                            CurrentUserEntityId = Convert.ToInt32(identity.Claims.Where(c => c.Type == JwtConstant.EntityId).SingleOrDefault().Value);
                        } */
                        if (identity.HasClaim(c => c.Type == JwtConstant.IsMobile))
                        {
                            IsMobile = Convert.ToString(identity.Claims.Where(c => c.Type == JwtConstant.IsMobile).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.WorkerCode))
                        {
                            CurrentWorkerCode = Convert.ToString(identity.Claims.Where(c => c.Type == JwtConstant.WorkerCode).SingleOrDefault().Value);
                        }
                        if (identity.HasClaim(c => c.Type == JwtConstant.DeviceCode))
                        {
                            CurrentDeviceCode = Convert.ToString(identity.Claims.Where(c => c.Type == JwtConstant.DeviceCode).SingleOrDefault().Value);
                        }
                    }
                    else
                    {
                        throw new Exception("User is not Authenticated");
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }
    }

    public interface IWebAppUser
    {
        string AccessToken
        {
            get;
        }

        int LoggedInUserId
        {
            get;
        }

        int CurrentRootId
        {
            get;
        }

        string CurrentUserId
        {
            get;
        }

       /* int CurrentUserEntityId
        {
            get;
        }

        string CurrentUserEntity
        {
            get;
        } */

        string LoggedInRoleCode
        {
            get;
        }

        int CurrentRoleId
        {
            get;
        }
    }
}
