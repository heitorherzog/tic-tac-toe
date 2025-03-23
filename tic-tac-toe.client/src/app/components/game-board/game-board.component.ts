import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CellSource, SOURCE_REMOTE } from '../../game.constants';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  @Input() board: string[] = Array(9).fill('');
  @Input() cellSources: (CellSource | null)[] = Array(9).fill(null);
  @Input() isGameOver: boolean = false;
  @Input() isMyTurn: boolean = true;
  @Output() moveMade = new EventEmitter<number>();

  readonly REMOTE = SOURCE_REMOTE;

  onCellClick(index: number): void {
    if (!this.board[index] && !this.isGameOver && this.isMyTurn) {
      this.moveMade.emit(index);
    }
  }

}
