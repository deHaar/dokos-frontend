import { defineStore } from "pinia";
import type { Round, Player, Game } from "@/types";

let nextPlayerId = 1;
let nextGameId = 1;
let nextRoundId = 1;

export const useRoundStore = defineStore('round', {
  state: () => ({
    round: {
      id: nextRoundId++,
      players: [] as Player[],
      games: [] as Game[],
    } as Round,
  }),
  actions: {
    addPlayer(displayName: string) {
      this.round.players.push({
        id: nextPlayerId++,
        displayName,
      });
    },
    addGame(gameData: Omit<Game, 'id'>) {
      this.round.games.push({
        id: nextGameId++,
        mixerId: gameData.mixerId,
        forehand: gameData.forehand,
        secondHand: gameData.secondHand,
        thirdHand: gameData.thirdHand,
        backhand: gameData.backhand,
        value: gameData.value,
        bocks: gameData.bocks,
      });
    },
  },
});
