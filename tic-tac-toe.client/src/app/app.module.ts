import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameControlComponent } from './components/game-control/game-control.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { RoomSelectComponent } from './components/room-select/room-select.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameControlComponent,
    GameStatusComponent,
    RoomSelectComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
