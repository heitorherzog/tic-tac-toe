import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { Subject } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
 constructor(private signalR: SignalrService) { }

  board: string[] = Array(9).fill('');
  isGameOver = false;
  mode: 'pvp' | 'ai' = 'ai';
  winner: 'X' | 'O' | null = null;
  isDraw = false;
  currentPlayer: 'X' | 'O' = 'X';
  playerSymbol: 'X' | 'O' = 'X'; // Human is always 'X'
  aiSymbol: 'X' | 'O' = 'O';     // AI is always 'O'
  showWaitingOverlay = false;
  showRoomSelector = true;
  roomId = '';
  cellSources: ('local' | 'remote')[] = Array(9).fill(null);
  roomPlayerCount = 0;
  canPlay = false;
  isRoomOwner = false;
  roomFromUrl: string | null = null;

  get isMyTurn(): boolean {
    return this.mode === 'ai' || this.playerSymbol === this.currentPlayer;
  }


  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    if (room) {
      this.roomFromUrl = room;
    }

    this.showWaitingOverlay = true;
    this.signalR.onPlayerSymbol.subscribe(symbol => {
      this.playerSymbol = symbol;
      this.currentPlayer = 'X'; // X always starts
      this.showRoomSelector = false;
      this.showWaitingOverlay = false; // hide when both players joined
      this.isRoomOwner = symbol === 'X';  // you're the room creator
    });

    this.signalR.onMoveReceived.subscribe(({ index, player }) => {
      if (!this.board[index] && !this.isGameOver) {
          this.board[index] = player;
          this.cellSources[index] = 'remote';
          this.checkGameOver();
          this.currentPlayer = player === 'X' ? 'O' : 'X';
       }
    });
  }
  

  onMove(index: number) {
    if (this.board[index] || this.isGameOver) return;

    // Block move if not your turn(only applies in PvP)
    if (this.mode === 'pvp' && this.playerSymbol !== this.currentPlayer) {
      return;
    }

    this.board[index] = this.currentPlayer;
    this.cellSources[index] = 'local';
    this.checkGameOver();

    if (this.mode === 'ai' && !this.isGameOver) {
      this.currentPlayer = 'O';
      setTimeout(() => this.makeAIMove(), 300);
    }

    if (this.mode === 'pvp') {
      this.signalR.sendMoveToRoom(this.roomId, index, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
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
        this.isDraw = false;
        return;
      }
    }

    if (this.board.every(cell => cell)) {
      this.winner = null; 
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

  async onJoinOnline(roomId: string) {
    this.roomId = roomId;
    this.showWaitingOverlay = true;

    await this.signalR.startConnection(); 
    this.signalR.joinRoom(roomId);

    this.signalR.onPlayerSymbol.subscribe(symbol => {
      this.playerSymbol = symbol;
      this.mode = 'pvp';
      this.currentPlayer = 'X';
      this.showRoomSelector = false;
      this.showWaitingOverlay = false;
    });

    this.signalR.onRoomPlayerCount.subscribe(count => {
      this.roomPlayerCount = count;
      this.canPlay = count === 2;
    });

    this.signalR.onMoveReceived.subscribe(({ index, player }) => {
      this.board[index] = player;
      this.checkGameOver();
      this.currentPlayer = player === 'X' ? 'O' : 'X';
    });
  }


  onPlayOffline() {
    this.showRoomSelector = false;
    this.showWaitingOverlay = false;
    this.mode = 'ai';
    this.playerSymbol = 'X';
    this.currentPlayer = 'X';
    this.onRestartGame();
  }

  onReturnToMenu() {
    this.showRoomSelector = true;
    this.showWaitingOverlay = false;
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.winner = null;
    this.isDraw = false;
    this.mode = 'ai'; 
    this.roomId = '';
    this.playerSymbol = 'X';
  }

  copyInviteLink() {
    const url = `${window.location.origin}?room=${this.roomId}`;
    navigator.clipboard.writeText(url)
      .then(() => alert('Invite link copied! 🎉'))
      .catch(() => alert('Failed to copy link'));
  }


}
