using System;
using System.Threading.Tasks;
namespace GS2020API.Helper
{
    public interface ILogProvider
    {
        void LogInfoAsync(string message);
        void LogDebugAsync(string message);
        void LogWarnAsync(string message);
        void LogErrorAsync(string message, Exception ex = null);
    }
}