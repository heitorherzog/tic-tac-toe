import { Component, Input } from '@angular/core';
import { GameMode, PlayerSymbol } from '../../game.constants';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent {
  @Input() winner: PlayerSymbol | null  = null;
  @Input() isDraw: boolean  = false;
  @Input() mode: GameMode  = 'pvp';
  @Input() playerSymbol:PlayerSymbol  = 'X';
}
