
using Infrastructure.Persistence;
using Scrutor;

namespace Employees.Maintenance.Api.Extensions;

internal static class ImplementedInterfaceExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
        => services.Scan(scan =>
        {
            scan
                .FromAssemblyOf<LeaderboardDbContext>()
                .AddClasses(x => x.Where(t => t.Name.EndsWith("Repository")))
                .AsImplementedInterfaces()
                .UsingRegistrationStrategy(RegistrationStrategy.Replace(ReplacementBehavior.ImplementationType))
                .AsMatchingInterface()
                .WithScopedLifetime();
        });
}