using Microsoft.EntityFrameworkCore;
using tic_tac_toe.Server.Domain.Entities;

namespace Infrastructure.Persistence;

public class LeaderboardDbContext : DbContext
{
    public LeaderboardDbContext(DbContextOptions<LeaderboardDbContext> options)
        : base(options) { }

    public DbSet<LeaderboardSnapshot> Leaderboard => Set<LeaderboardSnapshot>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LeaderboardDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
