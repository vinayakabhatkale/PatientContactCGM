using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using DataProcessor.Models;

namespace DataProcessor.DataServices
{
    public class CSVHelperService
    {
        ILogger _log;
        public CSVHelperService(ILogger log)
        {
            _log = log;
        }

        public async Task<List<VehicleTracker>> ProcessCSV(Stream myBlob)
        {
            List<VehicleTracker> list = new List<VehicleTracker>();
            try
            {
                using (var reader = new StreamReader(myBlob))
                {
                    var lineNumber = 1;
                    var line = await reader.ReadLineAsync();

                    while (line != null)
                    {
                        VehicleTracker processedData = ProcessLine(line, lineNumber);
                        if (processedData != null)
                        {
                            list.Add(processedData);
                        }
                        line = await reader.ReadLineAsync();
                        lineNumber++;
                    }
                }
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Funcation App: TrackerDataProcess, In CSVHelperService at ProcessCSV method: Fail to fetch data.");
                throw;
            }
            return list;
        }

        public VehicleTracker ProcessLine(string line, int lineNumber)
        {
            VehicleTracker data = new VehicleTracker();

            // validate blob details.
            if (string.IsNullOrWhiteSpace(line))
            {
                _log.LogWarning($"Funcation App: TrackerDataProcess, In CSVHelperService at ProcessLine method: Line {lineNumber} is empty.");
                return null;
            }

            var parts = line.Split(',');
            if (parts.Length < 10)
            {
                _log.LogError($"Funcation App: TrackerDataProcess, In CSVHelperService at ProcessLine method: Invalid data at Line {lineNumber}.");
                return null;
            }

            // prepare blobdetails model.
            CultureInfo provider = CultureInfo.InvariantCulture;
            data.TrackerDateTime = DateTime.ParseExact(parts[5], "yyMMddHHmmss", provider);
            data.DeviceId = parts[1];
            data.Longitude = parts[4];
            data.Latitude = parts[3];
            data.Speed = parts[7];
            data.KiloMeter = parts[9];
            data.GPS = parts[6];

            return data;
        }
    }
}
