export interface Player {
  id: number;
  displayName: string;
}

export interface GameParticipant {
  playerId: number;
  points: number;
  re: boolean;
  won: boolean;
}

export interface GameParticipator {
  playerId: number,
  team: Team
}

export interface Game {
  id: number;
  mixerId: number;
  forehand: GameParticipant;
  secondHand: GameParticipant;
  thirdHand: GameParticipant;
  backhand: GameParticipant;
  value: number;
  bocks: number;
}

export interface Round {
  id: number;
  players: Player[];
  games: Game[];
}

export enum Team {
  RE = "Re",
  KONTRA = "Kontra"
}