using MediatR;
using tic_tac_toe.Server.Domain.Entities;

namespace tic_tac_toe.Server.Application.Query.Leaderboard.Get;

public class GetLeaderboardQuery : IRequest<LeaderboardSnapshot> { }
