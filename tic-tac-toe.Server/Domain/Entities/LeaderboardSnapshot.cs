namespace tic_tac_toe.Server.Domain.Entities;

public class LeaderboardSnapshot
{
    public int Id { get; set; } // always 1
    public int X { get; set; }
    public int O { get; set; }
    public int AI { get; set; }
    public int Draw { get; set; }
    public int GamesPlayed { get; set; }
}

