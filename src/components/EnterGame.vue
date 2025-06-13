<script setup lang="ts">
import { computed, ref } from 'vue';
import { type GameParticipator, Team } from '@/types';
import { useRoundStore } from '@/stores/round'
import GameParticipation from './GameParticipation.vue';

const roundStore = useRoundStore()
const round = computed(() => roundStore.round)

const mixerId = ref<number>(-1)
const winnerTeam = ref<Team>(Team.RE)
const gameVal = ref<number>(0)
const forehand = ref<GameParticipator>({ playerId: -1, team: Team.KONTRA})
const secondHand = ref<GameParticipator>({ playerId: -1, team: Team.KONTRA})
const thirdHand = ref<GameParticipator>({ playerId: -1, team: Team.KONTRA})
const backhand = ref<GameParticipator>({ playerId: -1, team: Team.KONTRA})
</script>

<template>
    <div class="container">
        <label for="forehand">
            Vorhand
            <GameParticipation id="forehand" v-model:player-id="forehand.playerId" v-model:team="forehand.team" />
        </label>
        <label for="secondHand">
            Zweithand
        <GameParticipation id="secondHand" v-model:player-id="secondHand.playerId" v-model:team="secondHand.team" />
        </label>
    </div>
    <div class="container">
        <label for="thirdHand">
            Dritthand
            <GameParticipation id="thirdHand" v-model:player-id="thirdHand.playerId" v-model:team="thirdHand.team" />
        </label>
        <label for="backhand">
            Hinterhand
            <GameParticipation id="backhand" v-model:player-id="backhand.playerId" v-model:team="backhand.team" />
        </label>
    </div>
    <div class="container">
        <label for="mixerId">
            Gegeben
            <select id="mixerId" v-model="mixerId">
                <option value="-1">--- wählen ---</option>
                <option v-for="player in round.players" :key="player.id" :value="player.id">
                    {{ player.displayName }}
                </option>
            </select>
        </label>
        <label for="winnerTeam">
            Gewonnen
            <select id="winnerTeam" v-model="winnerTeam">
                <option v-for="team in Team">{{ team.toString() }}</option>
            </select>
        </label>
        <label for="gameVal">
            Spielwert
            <input id="gameVal" type="number" v-model="gameVal" min="-256" max="256" placeholder="0">
        </label>
    </div>
    <div class="container">
        <h3>{{ winnerTeam.toString() }} hat das Spiel mit dem Wert {{ gameVal }} gewonnen, gegeben hat {{ round.players.find(({id}) => id === mixerId)?.displayName }}</h3>
    </div>
    <div class="container">
        <label for="outForehand">
            Vorhand:
            <p id="outForehand">{{ round.players.find(({id}) => id === forehand.playerId)?.displayName }} ({{ forehand.team.toString() }})</p>
        </label>
        <label for="outSecondHand">
            Zweithand:
            <p id="outSecondHand">{{ round.players.find(({id}) => id === secondHand.playerId)?.displayName }}  ({{ secondHand.team.toString() }})</p>
        </label>
        <label for="outThirdHand">
            Dritthand:
            <p id="outThirdHand">{{ round.players.find(({id}) => id === thirdHand.playerId)?.displayName }}  ({{ thirdHand.team.toString() }})</p>
        </label>
        <label for="outBackhand">
            Hinterhand:
            <p id="outBackhand">{{ round.players.find(({id}) => id === backhand.playerId)?.displayName }}  ({{ backhand.team.toString() }})</p>
        </label>
    </div>
</template>

<style>
.container {
  display: flex;
  column-gap: 20px;
  justify-content: space-around;
  padding: 1%;
}
</style>