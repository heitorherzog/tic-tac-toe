import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  board: string[] = Array(9).fill('');
  currentPlayer: 'X' | 'O' = 'X';
  isGameOver = false;

  onMove(index: number) {
    this.board[index] = this.currentPlayer;
    this.checkGameOver();
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkGameOver() {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]           // diagonals
    ];

    for (let [a, b, c] of wins) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.isGameOver = true;
        return;
      }
    }

    if (this.board.every(cell => cell)) {
       this.isGameOver = true;
    }
  }


  
}
