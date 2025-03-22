using Microsoft.AspNetCore.SignalR;
namespace tic_tac_toe.Server.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendMove(int index, string player)
        {
            await Clients.Others.SendAsync("ReceiveMove", index, player);
        }
    }
}
