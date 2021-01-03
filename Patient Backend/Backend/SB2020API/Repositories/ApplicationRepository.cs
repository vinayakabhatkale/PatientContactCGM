using Dapper;
using GS2020API.Helper;
using GS2020API.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Repositories
{
    public class ApplicationRepository: IApplicationRepository
    {
        private IConfiguration configuration;
        public ILogProvider _logProvider;
        ResponseModel response = new ResponseModel();
        string connectionString;
        public ApplicationRepository(IConfiguration iconfig, ILogProvider _logProvider)
        {
            configuration = iconfig;
            this._logProvider = _logProvider;
            connectionString = configuration.GetSection("SQLSettings").GetSection("ConnectionString").Value;

        }
        public async Task<ResponseModel> Add(ApplicationModel model)
        {
            try
            {
                DateTime CreatedAt = DateTime.Now;
                var parameters = new DynamicParameters();

                parameters.Add("@RootId", model.RootId);

                parameters.Add("@address", model.address);
                parameters.Add("@bloodgroup", model.bloodgroup);
                parameters.Add("@contact", model.contact);
                parameters.Add("@date", model.date);
                parameters.Add("@email", model.email);
                parameters.Add("@firstname", model.firstname);
                parameters.Add("@gender", model.gender);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@lastname", model.lastname);
               
                parameters.Add("@CreatedAt", CreatedAt);
                parameters.Add("@CreatedBy", model.CreatedBy);


                using (var connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    var Result = await connection.QueryFirstOrDefaultAsync("sp_Appointment_add",
                                 parameters,
                                 commandType: CommandType.StoredProcedure);
                    response.status = "success";
                    response.data = Result.Id;
                    return response;

                }

            }
            catch (Exception ex)
            {
                var Error = ex;
                response.status = "failed";
                response.message = Error.ToString();
                return response;
            }

        }
        public async Task<ResponseModel> Edit(ApplicationModel model)
        {
            try
            {
                DateTime UpdatedAt = DateTime.Now;
                var parameters = new DynamicParameters();

                parameters.Add("@UpdatedAt", UpdatedAt);
                parameters.Add("@UpdatedBy", model.UpdatedBy);
                parameters.Add("@RootId", model.RootId);

                parameters.Add("@Id", model.Id);

                parameters.Add("@address", model.address);
                parameters.Add("@bloodgroup", model.bloodgroup);
                parameters.Add("@contact", model.contact);
                parameters.Add("@date", model.date);
                parameters.Add("@email", model.email);
                parameters.Add("@firstname", model.firstname);
                parameters.Add("@gender", model.gender);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@lastname", model.lastname);

                using (var connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    var Result = await connection.QueryFirstOrDefaultAsync("sp_Appointment_update",
                                    parameters,
                                    commandType: CommandType.StoredProcedure);
                    response.status = "success";
                    response.data = Result.Id;
                    return response;

                }
            }

            catch (Exception ex)
            {
                var Error = ex;
                response.status = "failed";
                response.message = Error.ToString();
                return response;

            }
        }
        public async Task<ResponseModel> GetById(int Id)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", Id);
                using (var connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var Result = await connection.QueryFirstOrDefaultAsync<ApplicationModel>("sp_Appointment_getbyid",
                                    parameters,
                                    commandType: CommandType.StoredProcedure);
                    response.status = "success";
                    response.data = Result;
                    return response;
                }
            }

            catch (Exception ex)
            {
                var Error = ex;
                response.status = "failed";
                response.message = Error.ToString();
                return response;
            }

        }
        public async Task<ResponseModel> GetAll(ApplicationFilter applicationFilter)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@date", applicationFilter.date);
                parameters.Add("@SearchString", applicationFilter.SearchString);
                using (var connection = new SqlConnection(connectionString))
                {

                    await connection.OpenAsync();
                    var Result = await connection.QueryAsync<ApplicationModel>("sp_Appointment_getall",
                                    parameters,
                                    commandType: CommandType.StoredProcedure);
                    response.status = "success";
                    response.data = Result;
                    return response;
                }
            }
            catch (Exception ex)
            {
                var Error = ex;
                response.status = "failed";
                response.message = Error.ToString();
                return response;

            }
        }
        public async Task<ResponseModel> DeleteById(int Id)
        {
            try
            {

                var parameters = new DynamicParameters();
                parameters.Add("@Id", Id);
                using (var connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    var Result = await connection.QueryFirstOrDefaultAsync<ApplicationModel>("sp_Appointment_deletebyid",
                                    parameters,
                                    commandType: CommandType.StoredProcedure);
                    response.status = "success";
                    response.data = Result;
                    return response;
                }
            }

            catch (Exception ex)
            {
                var Error = ex;
                response.status = "failed";
                response.message = Error.ToString();
                return response;

            }
        }


    }
}
