
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Employees.Maintenance.Api.Extensions;

internal static class EntityFrameworkExtensions
{
    public static IServiceCollection AddEntityFramework(this IServiceCollection services, string defaultConnection)
    {
        services.AddDbContext<LeaderboardDbContext>(options =>
            options.UseNpgsql(defaultConnection, options => options.MigrationsHistoryTable("__efmigrationshistory", "public"))
        );

        return services;
    }

    public static IHost ExecuteMigrations<TDbContext>(this IHost host) where TDbContext : DbContext
    {
        using var scope = host.Services.CreateScope();

        scope
            .ServiceProvider
            .GetRequiredService<TDbContext>()
            .Database
            .Migrate();

        return host;
    }
}