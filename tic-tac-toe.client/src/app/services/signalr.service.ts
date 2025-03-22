import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  public onPlayerSymbol = new Subject<'X' | 'O'>();
  public onMoveReceived = new Subject<{ index: number, player: 'X' | 'O' }>();

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
    // TODO: have to pass a hardcoded url if wants to run inside visual studio hitting (F5)
      .withUrl('https://localhost:7004/gamehub', {
        withCredentials: true
      })
      // withUrl(gamehub)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('ReceiveMove', (index: number, player: 'X' | 'O') => {
      this.onMoveReceived.next({ index, player });
    });

    this.hubConnection.on('ReceivePlayerSymbol', (symbol: 'X' | 'O') => {
      this.onPlayerSymbol.next(symbol);
    });

    return this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error:', err));
  }

  public joinRoom(roomId: string): void {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('JoinRoom', roomId)
        .catch(err => console.error('JoinRoom error:', err));
    } else {
      console.warn('Cannot join room: connection not ready');
    }
  }

  public sendMoveToRoom(roomId: string, index: number, player: 'X' | 'O') {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMove', roomId, index, player)
        .catch(err => console.error('SendMove error:', err));
    } else {
      console.warn('Cannot send move: not connected');
    }
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        console.log('SignalR connection stopped.');
      });
    }
  }
}
