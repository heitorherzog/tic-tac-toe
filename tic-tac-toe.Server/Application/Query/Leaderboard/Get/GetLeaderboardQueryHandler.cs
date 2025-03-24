using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tic_tac_toe.Server.Application.Query.Leaderboard.Get;
using tic_tac_toe.Server.Domain.Entities;

public class GetLeaderboardQueryHandler : IRequestHandler<GetLeaderboardQuery, LeaderboardSnapshot>
{
    private readonly LeaderboardDbContext _context;

    public GetLeaderboardQueryHandler(LeaderboardDbContext context)
    {
        _context = context;
    }

    public async Task<LeaderboardSnapshot> Handle(GetLeaderboardQuery request, CancellationToken cancellationToken)
    {
        return await _context.Leaderboard.FirstOrDefaultAsync(cancellationToken) ?? new LeaderboardSnapshot();
    }
}
