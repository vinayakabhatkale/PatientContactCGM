using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using DataProcessor.Models;
using DataProcessor.DataServices;

namespace DataProcessor
{
    public static class TrackerDataProcess
    {
        [FunctionName("TrackerDataProcess")]
        public static async Task Run([BlobTrigger("dataingestioncontainer/{name}", Connection = "AzureWebJobsStorage")]Stream myBlob, string name, ILogger log)
        {
            CSVHelperService _fileService = new CSVHelperService(log);
            VehicleTrackerService _vehicleTrackerService = new VehicleTrackerService(log);

            log.LogInformation($"Funcation App: TrackerDataProcess, Name:{name}, Size: {myBlob.Length} Bytes");

            if (myBlob.Length > 0)
            {
                List<VehicleTracker> list = new List<VehicleTracker>();
                try
                {
                    list = await _fileService.ProcessCSV(myBlob);
                }
                catch
                {
                    log.LogError("Funcation App: TrackerDataProcess, Fail to fetch data.");
                    throw;
                }

                // save details in database.
                if (list.Count > 0)
                {
                    try
                    {
                        await _vehicleTrackerService.AddVehicleTrackerDetails(list);
                    }
                    catch (Exception ex)
                    {
                        log.LogError(ex, "Funcation App: TrackerDataProcess, Fail to process data.");
                        throw;
                    }
                }
                else
                {
                    log.LogWarning($"Funcation App: TrackerDataProcess, data not found to process.");
                }
            }
        }
    }
}
