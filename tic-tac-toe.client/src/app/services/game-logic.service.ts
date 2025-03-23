import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import {
  PLAYER_X,
  PLAYER_O,
  PlayerSymbol,
  MODE_AI,
  MODE_PVP,
  SOURCE_LOCAL,
  SOURCE_REMOTE,
  ROOM_QUERY_PARAM
} from '../game.constants';


@Injectable({ providedIn: 'root' })
export class GameLogicService {
  constructor(private state: GameStateService) { }

  initializeGame(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get(ROOM_QUERY_PARAM);

    if (roomFromUrl) {
      this.state.roomId$.next(roomFromUrl);
      this.state.showRoomSelector$.next(false);
      this.state.mode$.next(MODE_PVP);
      this.state.signalR?.startConnection().then(() => {
        this.state.signalR?.joinRoom(roomFromUrl);
      });
    }

    this.state.signalR?.onPlayerSymbol.subscribe(symbol => {
      this.state.playerSymbol$.next(symbol);
      this.state.isRoomOwner$.next(symbol === PLAYER_X);
    });

    this.state.signalR?.onRoomPlayerCount.subscribe(count => {
      this.state.canPlay$.next(count === 2);
    });

    this.state.signalR?.onMoveReceived.subscribe(({ index, player }) => {
      this.applyRemoteMove(index, player);
    });
  }

  isMyTurn(): boolean {
    const mode = this.state.mode$.value;
    const player = this.state.playerSymbol$.value;
    const current = this.state.currentPlayer$.value;

    return mode === MODE_AI || player === current;
  }

  handleLocalMove(index: number): void {
    const board = [...this.state.board$.value];
    const sources = [...this.state.cellSources$.value];
    const current = this.state.currentPlayer$.value;

    if (board[index] || this.state.isGameOver$.value) return;
    if (this.state.mode$.value === MODE_PVP && this.state.playerSymbol$.value !== current) return;

    board[index] = current;
    sources[index] = SOURCE_LOCAL;

    this.state.board$.next(board);
    this.state.cellSources$.next(sources);

    this.checkGameOver();

    if (this.state.mode$.value === MODE_AI && !this.state.isGameOver$.value) {
      this.state.currentPlayer$.next(PLAYER_O);
      setTimeout(() => this.makeAIMove(), 300);
    }

    if (this.state.mode$.value === MODE_PVP) {
      this.state.signalR?.sendMoveToRoom(this.state.roomId$.value, index, current);
      this.state.currentPlayer$.next(current === PLAYER_X ? PLAYER_O : PLAYER_X);
    }

    if (this.state.mode$.value === MODE_AI) {
      this.state.currentPlayer$.next(current === PLAYER_X ? PLAYER_O : PLAYER_X);
    }
  }

  applyRemoteMove(index: number, player: PlayerSymbol): void {
    const board = [...this.state.board$.value];
    const sources = [...this.state.cellSources$.value];

    board[index] = player;
    sources[index] = SOURCE_REMOTE;

    this.state.board$.next(board);
    this.state.cellSources$.next(sources);

    this.checkGameOver();
    this.state.currentPlayer$.next(player === PLAYER_X ? PLAYER_O : PLAYER_X);
  }

  private makeAIMove(): void {
    const board = [...this.state.board$.value];
    const sources = [...this.state.cellSources$.value];
    const emptyIndex = board.findIndex(cell => !cell);
    if (emptyIndex === -1) return;

    board[emptyIndex] = PLAYER_O;
    sources[emptyIndex] = SOURCE_REMOTE;

    this.state.board$.next(board);
    this.state.cellSources$.next(sources);

    this.checkGameOver();
    this.state.currentPlayer$.next(PLAYER_X);
  }

  private checkGameOver(): void {
    const board = this.state.board$.value;
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of wins) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.state.winner$.next(board[a] as PlayerSymbol);
        this.state.isGameOver$.next(true);
        this.state.isDraw$.next(false);
        return;
      }
    }

    if (board.every(cell => cell)) {
      this.state.winner$.next(null);
      this.state.isDraw$.next(true);
      this.state.isGameOver$.next(true);
    }
  }
}
