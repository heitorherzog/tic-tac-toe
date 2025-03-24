using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using tic_tac_toe.Server.Application.Commands.Leaderboard.Update;
using tic_tac_toe.Server.Domain.Entities;

public class SaveLeaderboardCommandHandler : IRequestHandler<SaveLeaderboardCommand, Unit>
{
    private readonly LeaderboardDbContext _context;

    public SaveLeaderboardCommandHandler(LeaderboardDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(SaveLeaderboardCommand request, CancellationToken cancellationToken)
    {
        var snapshot = await _context.Leaderboard.FirstOrDefaultAsync(cancellationToken);

        if (snapshot == null)
        {
            snapshot = new LeaderboardSnapshot
            {
                X = request.X,
                O = request.O,
                AI = request.AI,
                Draw = request.Draw,
                GamesPlayed = request.GamesPlayed
            };
            _context.Leaderboard.Add(snapshot);
        }
        else
        {
            snapshot.X = request.X;
            snapshot.O = request.O;
            snapshot.AI = request.AI;
            snapshot.Draw = request.Draw;
            snapshot.GamesPlayed = request.GamesPlayed;
        }

        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
