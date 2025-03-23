export const PLAYER_X = 'X';
export const PLAYER_O = 'O';

export type PlayerSymbol = typeof PLAYER_X | typeof PLAYER_O;

export const MODE_AI = 'ai';
export const MODE_PVP = 'pvp';

export type GameMode = typeof MODE_AI | typeof MODE_PVP;

export const ROOM_QUERY_PARAM = 'room';
export const SOURCE_REMOTE = 'remote';
export const SOURCE_LOCAL = 'local';

export type CellSource = typeof SOURCE_REMOTE | typeof SOURCE_LOCAL;

