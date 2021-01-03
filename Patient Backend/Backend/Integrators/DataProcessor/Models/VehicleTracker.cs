using System;

namespace DataProcessor.Models
{
    public class VehicleTracker
    {
        public DateTime TrackerDateTime { get; set; }
        public String DeviceId { get; set; }
        public String GPS { get; set; }
        public String Latitude { get; set; }
        public String Longitude { get; set; }
        public String KiloMeter { get; set; }
        public String Speed { get; set; }
    }
}
