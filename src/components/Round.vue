<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoundStore } from "@/stores/round";
import type { Round, Player, Game, GameParticipator, GameParticipant } from "@/types";
import { Team } from '@/types'
import { getPointsForPlayerInGame, getTotalPointsForPlayer } from "@/utils/scoring";
import PlayerSelection from "@/components/PlayerSelection.vue";
import GameParticipation from "@/components/GameParticipation.vue";
import EnterGame from "./EnterGame.vue";

const store = useRoundStore();
const round = computed(() => store.round);

function getPoints(playerId: number, game: Game) {
  return getPointsForPlayerInGame(playerId, game);
}

function getTotalPoints(playerId: number) {
  return getTotalPointsForPlayer(playerId, round.value.games);
}

function addGameResult(
  mixerId: number,
  forehand: GameParticipant,
  secondHand: GameParticipant,
  thirdHand: GameParticipant,
  backhand: GameParticipant,
  value: number,
  bocks: number
) {
  store.addGame({
    mixerId: mixerId,
    forehand: forehand,
    secondHand: secondHand,
    thirdHand: thirdHand,
    backhand: backhand,
    value: value,
    bocks: bocks,
  });
}

function addTestData() {
  // add players first
  round.value.players.push(
    { id: 1, displayName: "Maze" },
    { id: 2, displayName: "Larrya" },
    { id: 3, displayName: "Martin" },
    { id: 4, displayName: "Tiffi" },
    { id: 5, displayName: "Cheese" }
  );
  // add games
  store.addGame({
    mixerId: 1,
    forehand: {
      playerId: 2,
      points: 2,
      re: true,
      won: true,
    },
    secondHand: {
      playerId: 3,
      points: 2,
      re: true,
      won: true,
    },
    thirdHand: {
      playerId: 4,
      points: -2,
      re: false,
      won: false,
    },
    backhand: {
      playerId: 5,
      points: -2,
      re: false,
      won: false,
    },
    value: 2,
    bocks: 0,
  });
  store.addGame({
    mixerId: 2,
    forehand: {
      playerId: 1,
      points: 4,
      re: true,
      won: true,
    },
    secondHand: {
      playerId: 3,
      points: -4,
      re: false,
      won: false,
    },
    thirdHand: {
      playerId: 4,
      points: 4,
      re: true,
      won: true,
    },
    backhand: {
      playerId: 5,
      points: -4,
      re: false,
      won: false,
    },
    value: 4,
    bocks: 0,
  });
  store.addGame({
    mixerId: 3,
    forehand: {
      playerId: 4,
      points: 6,
      re: true,
      won: true,
    },
    secondHand: {
      playerId: 5,
      points: -6,
      re: false,
      won: false,
    },
    thirdHand: {
      playerId: 1,
      points: 6,
      re: true,
      won: true,
    },
    backhand: {
      playerId: 2,
      points: -6,
      re: false,
      won: false,
    },
    value: 6,
    bocks: 0,
  });
}

const forehand = ref({ playerId: -1, team: Team.KONTRA} as GameParticipator)

function logUpdate(pos: string, what: string) {
  console.log('[Round.vue | ' + pos + '] —> ' + what + ' updated: { playerId: ' + forehand.value.playerId + ', team: ' + forehand.value.team.toString() + ' }')
}

addTestData();
</script>

<template>
  <div class="wrapper" padding="24px">
    <div>
      <!-- <PlayerSelection padding="16px" /> -->
      <!-- <GameParticipation id="forehand"
                         @change="console.log($event.target.value)"
                         v-model:player-id="forehand.playerId" v-model:team="forehand.team" @update:player-id="logUpdate('forehand', 'playerId')" @update:team="logUpdate('forehand', 'te')"/> -->
      <EnterGame />  
    <div>
          <p>Spieler {{ forehand.playerId }} war {{ forehand.team.toString() }}</p>
      </div>
    </div>
    <div>
      <h1>Doko-Runde</h1>
      <table>
        <thead>
          <tr>
            <th v-for="player in round.players" :key="player.displayName">
              {{ player.displayName }}
            </th>
            <th colspan="2">Result</th>
          </tr>
          <tr>
            <th v-for="player in round.players" :key="'total-' + player.displayName">
              {{ getTotalPoints(player.id) }}
            </th>
            <th>Value</th>
            <th>Bocks</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr v-for="(game, index) in round.games" :key="index">
            <td v-for="player in round.players" :key="player.id">
              {{ getPoints(player.id, game) }}
            </td>
            <td>{{ game.value }}</td>
            <td>{{ game.bocks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  column-gap: 20px;
  justify-content: space-around;
}
</style>
