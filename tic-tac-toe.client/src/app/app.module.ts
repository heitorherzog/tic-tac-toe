import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameControlComponent } from './components/game-control/game-control.component';
import { GameStatusComponent } from './components/game-status/game-status.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameControlComponent,
    GameStatusComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
