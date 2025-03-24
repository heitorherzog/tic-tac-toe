export const PLAYER_X = 'x';
export const PLAYER_O = 'o';
export type PlayerSymbol = typeof PLAYER_X | typeof PLAYER_O;

export const MODE_AI = 'ai';
export const MODE_PVP = 'pvp';
export type GameMode = typeof MODE_AI | typeof MODE_PVP;

export const SOURCE_REMOTE = 'remote';
export const SOURCE_LOCAL = 'local';
export type CellSource = typeof SOURCE_REMOTE | typeof SOURCE_LOCAL;

export const ROOM_QUERY_PARAM = 'room';
export const DRAW = 'draw';
export const GAMES_PLAYED = 'gamesPlayed';

export interface Leaderboard {
  x: number;
  o: number;
  ai: number;
  draw: number;
  gamesPlayed: number;
}

