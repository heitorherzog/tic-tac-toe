using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace tic_tac_toe.Server.Hubs
{
    public class GameHub : Hub
    {
        // In-memory room player tracking (basic for now)
        private static readonly ConcurrentDictionary<string, List<string>> RoomPlayers = new();

        public async Task JoinRoom(string roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            RoomPlayers.AddOrUpdate(
                roomId,
                new List<string> { Context.ConnectionId },
                (key, list) =>
                {
                    if (!list.Contains(Context.ConnectionId))
                        list.Add(Context.ConnectionId);
                    return list;
                });

            var playerSymbol = RoomPlayers[roomId].Count == 1 ? "X" : "O";

            await Clients.Caller.SendAsync("ReceivePlayerSymbol", playerSymbol);

            Console.WriteLine($"Client {Context.ConnectionId} joined room {roomId} as {playerSymbol}");
        }

        public async Task SendMove(string roomId, int index, string player)
        {
            await Clients.GroupExcept(roomId, Context.ConnectionId)
                         .SendAsync("ReceiveMove", index, player);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            foreach (var room in RoomPlayers)
            {
                if (room.Value.Remove(Context.ConnectionId))
                {
                    Console.WriteLine($"Client {Context.ConnectionId} left room {room.Key}");
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
