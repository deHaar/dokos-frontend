<script setup lang="ts">
import { computed } from 'vue'
import { useRoundStore } from '@/stores/round'
import type { Round, Player, Game, GameParticipant } from "@/types"
import { getPointsForPlayerInGame, getTotalPointsForPlayer } from '@/utils/scoring'

const store = useRoundStore()
const round = computed(() => store.round)

function getPoints(playerId: number, game: Game) {
  return getPointsForPlayerInGame(playerId, game)
}

function getTotalPoints(playerId: number) {
  return getTotalPointsForPlayer(playerId, round.value.games)
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
  store.addGame(
    {
      mixerId: mixerId,
      forehand: forehand,
      secondHand: secondHand,
      thirdHand: thirdHand,
      backhand: backhand,
      value: value,
      bocks: bocks
    }
  )
}

function addTestData() {
  // add players first
  round.value.players.push(
    { id: 1, displayName: "Maze" },
    { id: 2, displayName: "Larrya" },
    { id: 3, displayName: "Martin" },
    { id: 4, displayName: "Tiffi" },
    { id: 5, displayName: "Cheese" }
  )
  // add games
  store.addGame(
    {
      mixerId: 1,
      forehand: {
        playerId: 2,
        points: 2,
        re: true,
        won: true
      },
      secondHand: {
        playerId: 3,
        points: 2,
        re: true,
        won: true
      },
      thirdHand: {
        playerId: 4,
        points: -2,
        re: false,
        won: false
      },
      backhand: {
        playerId: 5,
        points: -2,
        re: false,
        won: false
      },
      value: 2,
      bocks: 0
    }
  )
  store.addGame(
    {
      mixerId: 2,
      forehand: {
        playerId: 1,
        points: 4,
        re: true,
        won: true
      },
      secondHand: {
        playerId: 3,
        points: -4,
        re: false,
        won: false
      },
      thirdHand: {
        playerId: 4,
        points: 4,
        re: true,
        won: true
      },
      backhand: {
        playerId: 5,
        points: -4,
        re: false,
        won: false
      },
      value: 4,
      bocks: 0
    }
  )
}

addTestData()
</script>

<template>
  <div>
    <h1>Round</h1>
    <table>
      <thead>
        <tr>
          <th v-for="player in round.players" :key="player.displayName">{{ player.displayName }}</th>
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
</template>
