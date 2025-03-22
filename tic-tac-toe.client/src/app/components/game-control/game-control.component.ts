import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() restart = new EventEmitter<void>();
  @Output() modeSelected = new EventEmitter<'pvp' | 'ai'>();

  selectedMode: 'pvp' | 'ai' = 'pvp';

  onSelectMode(mode: 'pvp' | 'ai') {
    this.selectedMode = mode;
    this.modeSelected.emit(mode);
    this.restart.emit(); 
  }

  onRestart() {
    this.restart.emit();
  }
}
