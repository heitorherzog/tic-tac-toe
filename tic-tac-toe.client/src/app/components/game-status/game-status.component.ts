import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent {
  @Input() winner: 'X' | 'O' | null = null;
  @Input() isDraw = false;
  @Input() mode: 'pvp' | 'ai' = 'pvp';
  @Input() playerSymbol: 'X' | 'O' = 'X';
}
