import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent {
  roomId = '';
  @Output() joinOnlineGame = new EventEmitter<string>();
  @Output() playOffline = new EventEmitter<void>();


  onJoin() {
    if (this.roomId.trim()) {
      this.joinOnlineGame.emit(this.roomId.trim());
    }
  }

}
