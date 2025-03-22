import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  // Emit when a move is received
  public onMoveReceived = new Subject<{ index: number, player: 'X' | 'O' }>();

  public startConnection(): void {

    this.hubConnection = new signalR.HubConnectionBuilder()

      // TODO: running both projects from vs studio (F5) it needs to pass a hard code url
      .withUrl('https://localhost:7004/gamehub', {
        withCredentials: true
      })

      // .withUrl('/gamehub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMove', (index: number, player: 'X' | 'O') => {
      this.onMoveReceived.next({ index, player });
    });
  }

  public sendMove(index: number, player: 'X' | 'O'): void {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMove', index, player)
        .catch(err => console.error(err));
    }
  }
}
