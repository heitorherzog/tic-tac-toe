import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leaderboard } from '../game.constants';


@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  private readonly baseUrl = '/leaderboard';

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<Leaderboard> {
    return this.http.get<Leaderboard>(this.baseUrl);
  }

  saveLeaderboard(data: Leaderboard): Observable<void> {
    return this.http.post<void>(this.baseUrl, data);
  }
}
