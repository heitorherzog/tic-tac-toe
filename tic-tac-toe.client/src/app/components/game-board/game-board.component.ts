import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  @Input() board: string[] = Array(9).fill('');
  @Input() currentPlayer: 'X' | 'O' = 'X';
  @Input() isGameOver: boolean = false;
  @Output() moveMade = new EventEmitter<number>();

  onCellClick(index: number): void {
    if (!this.board[index] && !this.isGameOver) {
      this.moveMade.emit(index);
    }
  }

}
