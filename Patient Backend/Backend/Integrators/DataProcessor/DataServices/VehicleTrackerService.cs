using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using DataProcessor.Models;

namespace DataProcessor.DataServices
{
    public class VehicleTrackerService : BaseService
    {
        ILogger _log;
        public VehicleTrackerService(ILogger log)
        {
            _log = log;
        }

        public async Task AddVehicleTrackerDetails(List<VehicleTracker> vehicleTrackerList)
        {
            int recordCount = 0;
            try
            {
                using (SqlConnection conn = GetSqlConnection())
                {
                    using (SqlCommand cmd = new SqlCommand("[dbo].[sp_AddVehicleTracker]"))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = conn;

                        cmd.Parameters.AddWithValue("@udt_VehicleTracker", CreateProcessedTrackerListToDataTable(vehicleTrackerList));

                        recordCount = await cmd.ExecuteNonQueryAsync();
                        _log.LogInformation($"{recordCount} rows were added.");
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Funcation App: TrackerDataProcess, In VehicleTrackerService at AddVehicleTrackerDetails method.");
                throw ex;
            }
        }

        private DataTable CreateProcessedTrackerListToDataTable(List<VehicleTracker> list)
        {
            try
            {
                if (list == null)
                {
                    throw new ArgumentNullException("TrackerDataList", "Invalid parameter list of BlobDetails");
                }
                else
                {
                    using (DataTable dataTable = new DataTable("udt_VehicleTracker"))
                    {

                        dataTable.Columns.Add("VehicleId");
                        dataTable.Columns.Add("DeviceId");
                        dataTable.Columns.Add("Lattitude");
                        dataTable.Columns.Add("Longitude");
                        dataTable.Columns.Add("TrackerDateTime");
                        dataTable.Columns.Add("GPS");
                        dataTable.Columns.Add("KiloMeter");
                        dataTable.Columns.Add("Speed");

                        foreach (VehicleTracker item in list)
                        {
                            DataRow dataRow = dataTable.NewRow();
                            dataRow["VehicleId"] = DBNull.Value;
                            dataRow["DeviceId"] = item.DeviceId;
                            dataRow["Lattitude"] = item.Latitude;
                            dataRow["Longitude"] = item.Longitude;
                            dataRow["TrackerDateTime"] = item.TrackerDateTime.ToString();
                            dataRow["GPS"] = item.GPS;
                            dataRow["KiloMeter"] = item.KiloMeter;
                            dataRow["Speed"] = item.Speed;
                            dataTable.Rows.Add(dataRow);
                        }
                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Funcation App: TrackerDataProcess, In VehicleTrackerService at CreateProcessedTrackerListToDataTable method: Exception occurred while converting SMS CreateSMSTransactionList to DataTable.");
                throw ex;
            }
        }
    }
}
