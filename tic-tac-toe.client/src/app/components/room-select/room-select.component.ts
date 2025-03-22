import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent implements OnInit {
  @Input() roomPreset: string | null = null;
  @Output() joinOnlineGame = new EventEmitter<string>();
  @Output() playOffline = new EventEmitter<void>();

  roomId = '';

  ngOnInit(): void {
    if (this.roomPreset) {
      this.roomId = this.roomPreset;
      // auto-join after a brief delay
      setTimeout(() => {
        this.joinOnlineGame.emit(this.roomId);
      }, 300);
    }
  }

  onJoin() {
    if (this.roomId.trim()) {
      this.joinOnlineGame.emit(this.roomId.trim());
    }
  }
}
