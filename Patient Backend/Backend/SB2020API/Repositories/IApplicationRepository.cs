using GS2020API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Repositories
{
    public interface IApplicationRepository
    {
        Task<ResponseModel> Add(ApplicationModel model);
        Task<ResponseModel> Edit(ApplicationModel model);
        Task<ResponseModel> GetById(int Id);
        Task<ResponseModel> GetAll(ApplicationFilter enquiryFilter);
        Task<ResponseModel> DeleteById(int Id);

    }
}
