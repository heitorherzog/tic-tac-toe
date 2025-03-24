using Serilog;

namespace Employees.Maintenance.Api.Extensions;

internal static class SerilogExtensions
{
    public static IHostBuilder UseLogger(this IHostBuilder builder)
    {
        builder.ConfigureServices(delegate (HostBuilderContext context, IServiceCollection collection)
        {
            Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(context.Configuration)
            .CreateLogger();

            Serilog.Debugging.SelfLog.Enable(Console.Out);
        });

        builder.UseSerilog();

        return builder;
    }
}