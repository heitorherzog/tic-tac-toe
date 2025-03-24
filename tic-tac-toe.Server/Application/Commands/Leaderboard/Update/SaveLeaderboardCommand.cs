using MediatR;

namespace tic_tac_toe.Server.Application.Commands.Leaderboard.Update;

public class SaveLeaderboardCommand : IRequest<Unit>
{
    public int X { get; set; }
    public int O { get; set; }
    public int AI { get; set; }
    public int Draw { get; set; }
    public int GamesPlayed { get; set; }
}
