<script setup lang="ts">
import { computed } from "vue";
import { useRoundStore } from "@/stores/round";
import { type Round, type Player, type Game, type GameParticipant, Team } from "@/types";
import { getPointsForPlayerInGame, getTotalPointsForPlayer } from "@/utils/scoring";
import PlayerSelection from "@/components/PlayerSelection.vue";
import AddNewGame from "./AddNewGame.vue";

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
      team: Team.RE,
    },
    secondHand: {
      playerId: 3,
      points: 2,
      team: Team.RE,
    },
    thirdHand: {
      playerId: 4,
      points: -2,
      team: Team.KONTRA,
    },
    backhand: {
      playerId: 5,
      points: -2,
      team: Team.KONTRA,
    },
    value: 2,
    bocks: 0,
  });
  store.addGame({
    mixerId: 2,
    forehand: {
      playerId: 1,
      points: 4,
      team: Team.RE,
    },
    secondHand: {
      playerId: 3,
      points: -4,
      team: Team.KONTRA,
    },
    thirdHand: {
      playerId: 4,
      points: 4,
      team: Team.RE,
    },
    backhand: {
      playerId: 5,
      points: -4,
      team: Team.KONTRA
    },
    value: 4,
    bocks: 0,
  });
  store.addGame({
    mixerId: 3,
    forehand: {
      playerId: 4,
      points: 6,
      team: Team.RE,
    },
    secondHand: {
      playerId: 5,
      points: -6,
      team: Team.KONTRA,
    },
    thirdHand: {
      playerId: 1,
      points: 6,
      team: Team.RE,
    },
    backhand: {
      playerId: 2,
      points: -6,
      team: Team.RE,
    },
    value: 6,
    bocks: 0,
  });
}

addTestData();
</script>

<template>
  <div class="wrapper" padding="24px">
    <!-- <div>
      <PlayerSelection padding="16px" />
    </div> -->
    <div>
      <AddNewGame />
    </div>
    <div>
      <h1>Round</h1>
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
  justify-content: space-between;
}
</style>
