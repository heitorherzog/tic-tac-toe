using MediatR;
using Microsoft.AspNetCore.Mvc;
using tic_tac_toe.Server.Application.Commands.Leaderboard.Update;
using tic_tac_toe.Server.Application.Query.Leaderboard.Get;


namespace tic_tac_toe.Server.Controllers;

    [ApiController]
    [Route("[controller]")]
    public class LeaderboardController : ControllerBase
    {
        public IMediator Mediator { get; }

        public LeaderboardController(IMediator mediator)
        {
            Mediator = mediator;
        }

        [HttpGet(Name = "GetLeaderboard")]
        public async Task<IActionResult> Get()
            => Ok(await Mediator.Send(new GetLeaderboardQuery()));

        [HttpPost]
        public async Task<IActionResult> SaveAsync([FromBody] SaveLeaderboardCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }
    }

