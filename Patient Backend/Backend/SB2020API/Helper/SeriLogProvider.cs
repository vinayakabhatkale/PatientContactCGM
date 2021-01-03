using Microsoft.Extensions.Configuration;
using Serilog;

namespace GS2020API.Helper
{
    public class SeriLogProvider
    {
        protected ILogger log { get; }
        public SeriLogProvider(IConfiguration configuration)
        {
            log = new LoggerConfiguration()
                  .ReadFrom.Configuration(configuration)
                  .CreateLogger();
        }
    }
}
