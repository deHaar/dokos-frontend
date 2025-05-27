import type { Game, Player } from '@/types';

export function getPointsForPlayerInGame(playerId: number, game: Game): number {
  const participants = [game.forehand, game.secondHand, game.thirdHand, game.backhand];
  const participant = participants.find(p => p.playerId === playerId);
  return participant?.points ?? 0;
}

export function getTotalPointsForPlayer(playerId: number, games: Game[]): number {
  return games.reduce((sum, game) => sum + getPointsForPlayerInGame(playerId, game), 0);
}