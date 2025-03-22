import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
 constructor(private signalR: SignalrService) { }

  board: string[] = Array(9).fill('');
  isGameOver = false;
  mode: 'pvp' | 'ai' = 'pvp';
  winner: 'X' | 'O' | null = null;
  isDraw = false;
  currentPlayer: 'X' | 'O' = 'X';
  playerSymbol: 'X' | 'O' = 'X'; // Human is always 'X'
  aiSymbol: 'X' | 'O' = 'O';     // AI is always 'O'

  ngOnInit(): void {
    this.signalR.startConnection();
    this.signalR.onMoveReceived.subscribe(({ index, player }) => {
      if (!this.board[index] && !this.isGameOver) {
        this.board[index] = player;
        this.checkGameOver();
        this.currentPlayer = player === 'X' ? 'O' : 'X';
      }
    });
  }

  onMove(index: number) {
    if (this.board[index] || this.isGameOver) return;

    this.board[index] = this.currentPlayer;
    this.checkGameOver();

    if (this.mode === 'pvp') {
      this.signalR.sendMove(index, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    if (this.mode === 'ai' && !this.isGameOver) {
      this.currentPlayer = 'O';
      setTimeout(() => this.makeAIMove(), 300);
    }
  }

  makeAIMove() {
    const available = this.board
      .map((cell, i) => cell === '' ? i : -1)
      .filter(i => i !== -1);
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    if (randomIndex !== undefined) {
      this.board[randomIndex] = 'O';
      this.checkGameOver();
      this.currentPlayer = 'X';
    }
  }

  checkGameOver() {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]           // diagonals
    ];

    for (let [a, b, c] of wins) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a] as 'X' | 'O';
        this.isGameOver = true;
        return;
      }
    }

    if (this.board.every(cell => cell)) {
       this.isDraw = true;
       this.isGameOver = true;
    }
  }

  onRestartGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.winner = null;
    this.isDraw = false;
  }

  onModeChange(mode: 'pvp' | 'ai') {
    this.mode = mode;
    this.playerSymbol = 'X';
    this.aiSymbol = 'O';
    this.onRestartGame();
  }



  
}
