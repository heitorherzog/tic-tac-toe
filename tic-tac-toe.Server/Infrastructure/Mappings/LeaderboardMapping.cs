using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tic_tac_toe.Server.Domain.Entities;

namespace tic_tac_toe.Server.Infrastructure.Mappings;

public sealed class LeaderboardMapping : IEntityTypeConfiguration<LeaderboardSnapshot>
{
    public void Configure(EntityTypeBuilder<LeaderboardSnapshot> builder)
    {
        builder.ToTable("Leaderboard");

        builder.HasKey(l => l.Id);

        builder.Property(l => l.X);
        builder.Property(l => l.O);
        builder.Property(l => l.AI);
        builder.Property(l => l.Draw);
        builder.Property(l => l.GamesPlayed).IsRequired();

    }
}
