using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Employees.Maintenance.Api.Extensions;

internal static class NewtonsoftJsonOptionsExtensions
{
    public static IMvcBuilder AddOutputFormat(this IMvcBuilder builder)
    {
        builder.AddNewtonsoftJson(SetupOutputFormat);

        return builder;
    }

    private static void SetupOutputFormat(MvcNewtonsoftJsonOptions options)
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
    }
}