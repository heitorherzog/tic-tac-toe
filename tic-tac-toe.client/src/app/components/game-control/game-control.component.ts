import { Component, EventEmitter, Output, Input } from '@angular/core';
import { GameMode, MODE_AI, MODE_PVP } from '../../game.constants';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Input() showModeToggle = true;
  @Output() restart = new EventEmitter<void>();
  @Output() modeSelected = new EventEmitter <GameMode>();
  @Output() returnToMenu = new EventEmitter<void>();

  readonly MODE_PVP = MODE_PVP;
  readonly MODE_AI = MODE_AI;

  selectedMode: GameMode = MODE_PVP;

  onSelectMode(mode: GameMode) {
    this.selectedMode = mode;
    this.modeSelected.emit(mode);
    this.restart.emit(); 
  }

  onRestart() {
    this.restart.emit();
  }
}
