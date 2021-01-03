using GS2020API.Models;
using GS2020API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Services
{
    public class ApplicationService : IApplicationService
    {
        
        public IApplicationRepository applicationrepository;

        public ApplicationService(IApplicationRepository applicationrepository)
        {
            this.applicationrepository = applicationrepository;
        }
        public async Task<ResponseModel> Add(ApplicationModel model)
        {
            var Result= await this.applicationrepository.Add(model);

            var response = await this.applicationrepository.GetById(Convert.ToInt32(Result.data));
            ApplicationModel _data = (ApplicationModel)response.data;
            return Result;
        }
        public async Task<ResponseModel> Edit(ApplicationModel model)
        {
            var Result= await this.applicationrepository.Edit(model);

            var response = await this.applicationrepository.GetById(Convert.ToInt32(Result.data));
            ApplicationModel _data = (ApplicationModel)response.data;
            return Result;

        }

        public async Task<ResponseModel> GetById(int Id)
        {
            return await this.applicationrepository.GetById(Id);

        }

        public async Task<ResponseModel> GetAll(ApplicationFilter applicationFilter)
        {
            return await this.applicationrepository.GetAll(applicationFilter);

        }

        public async Task<ResponseModel> DeleteById(int Id)
        {
            return await this.applicationrepository.DeleteById(Id);
        }

    }
}
