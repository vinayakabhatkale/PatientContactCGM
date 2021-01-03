
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace GS2020API.Helper
{
    public class LogProvider : SeriLogProvider, ILogProvider
    {
        public LogProvider(IConfiguration configuration)
            : base(configuration)
        { }

        public void LogDebugAsync(string message)
        {
            //Task.Run(() =>
            //{
            //    log.Debug(message);
            //});
            log.Debug(message);
        }

        public void LogErrorAsync(string message, Exception ex = null)
        {
            //Task.Run(() =>
            //{
            //    log.Error(ex, message);
            //});
            log.Error(ex, message);
        }

        public void LogInfoAsync(string message)
        {
            //Task.Run(() =>
            //{
            //    log.Information(message);
            //});
            log.Information(message);
        }

        public void LogWarnAsync(string message)
        {
            //Task.Run(() =>
            //{
            //    log.Warning(message);
            //});
            log.Warning(message);
        }
    }
}
