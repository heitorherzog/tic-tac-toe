import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameMode, PlayerSymbol, PLAYER_X, MODE_AI, CellSource } from '../game.constants';
import { SignalrService } from './signalr.service';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  constructor(public signalR: SignalrService) { }

  board$ = new BehaviorSubject<string[]>(Array(9).fill(''));
  cellSources$ = new BehaviorSubject<CellSource[]>(Array(9).fill('local' as CellSource));
  currentPlayer$ = new BehaviorSubject<PlayerSymbol>(PLAYER_X);
  winner$ = new BehaviorSubject<PlayerSymbol | null>(null);
  isDraw$ = new BehaviorSubject<boolean>(false);
  isGameOver$ = new BehaviorSubject<boolean>(false);
  mode$ = new BehaviorSubject<GameMode>(MODE_AI);
  playerSymbol$ = new BehaviorSubject<PlayerSymbol>(PLAYER_X);
  canPlay$ = new BehaviorSubject<boolean>(false);
  roomId$ = new BehaviorSubject<string>('');
  isRoomOwner$ = new BehaviorSubject<boolean>(false);
  showRoomSelector$ = new BehaviorSubject<boolean>(true);
  showWaitingOverlay$ = new BehaviorSubject<boolean>(false);

  resetGame(): void {
    this.board$.next(Array(9).fill(''));
    this.cellSources$.next(Array(9).fill(null));
    this.currentPlayer$.next(PLAYER_X);
    this.winner$.next(null);
    this.isDraw$.next(false);
    this.isGameOver$.next(false);
  }
}
