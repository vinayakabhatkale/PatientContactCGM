using System.Collections.Generic;

namespace GS2020API.Models
{
    public class StorageContentInfo
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string ContentType { get; set; }
        public Dictionary<string, string> Metadata { get; set; }
        public byte[] Content { get; set; }
        public string FileUrl { get; set; }
    }
}
