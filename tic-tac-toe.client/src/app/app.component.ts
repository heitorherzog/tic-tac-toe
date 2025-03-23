import { Component, OnInit } from '@angular/core';
import { GameStateService } from './services/game-state.service';
import { SignalrService } from './services/signalr.service';
import { GameLogicService } from './services/game-logic.service';
import { combineLatest, map } from 'rxjs';
import {
  PLAYER_X,
  MODE_AI,
  MODE_PVP,
  ROOM_QUERY_PARAM,
  GameMode
} from './game.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private signalR: SignalrService,
    public state: GameStateService,
    public gameLogic: GameLogicService,
  ) { }

  readonly MODE_PVP = MODE_PVP;
  readonly MODE_AI = MODE_AI;

  // for handling null
  vm$ = combineLatest([
    this.state.board$,
    this.state.cellSources$,
    this.state.currentPlayer$,
    this.state.isGameOver$,
    this.state.winner$,
    this.state.isDraw$,
    this.state.mode$,
    this.state.playerSymbol$
  ]).pipe(
    map(([board, cellSources, currentPlayer, isGameOver, winner, isDraw, mode, playerSymbol]) => ({
      board,
      cellSources,
      currentPlayer,
      isGameOver,
      winner,
      isDraw,
      mode,
      playerSymbol
    }))
  );

  ngOnInit(): void {
    this.gameLogic.initializeGame();
  }

  onMove(index: number): void {
    this.gameLogic.handleLocalMove(index);
  }

  copyInviteLink(): void {
    const url = `${window.location.origin}?${ROOM_QUERY_PARAM}=${this.state.roomId$.value}`;
    navigator.clipboard.writeText(url)
      .then(() => alert('Invite link copied! 🎉'))
      .catch(() => alert('Failed to copy link'));
  }

  onRestartGame(): void {
    this.state.resetGame();
  }

  onModeChange(mode: string) {
    this.state.mode$.next(mode as GameMode);
  }

  onReturnToMenu(): void {
    this.state.resetGame();
    this.state.mode$.next(MODE_AI);
    this.state.roomId$.next('');
    this.state.playerSymbol$.next(PLAYER_X);
    this.state.showRoomSelector$.next(true);
    this.state.canPlay$.next(false);
  }

  onJoinOnline(roomId: string) {
    this.state.roomId$.next(roomId);
    this.state.mode$.next(MODE_PVP);
    this.state.showRoomSelector$.next(false);
    this.signalR.startConnection().then(() => {
      this.signalR.joinRoom(roomId);
    });
  }

  onPlayOffline() {
    this.state.mode$.next(MODE_AI);
    this.state.showRoomSelector$.next(false);
  }
}
