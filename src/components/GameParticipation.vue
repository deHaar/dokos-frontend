<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Team } from '@/types'
import { useRoundStore } from '@/stores/round'

const roundStore = useRoundStore()
const round = computed(() => roundStore.round)

const gameParticipation = reactive({
    playerId: -1,
    team: Team.KONTRA
})

</script>

<template>
    <div>
        <select v-model="gameParticipation.playerId">
            <option :value="-1">--- Geber ---</option>
            <option v-for="player in round.players" :key="player.id" :value="player.id">
                {{ player.displayName }}
            </option>
        </select>
        <select v-model="gameParticipation.team">
            <option v-for="team in Team">{{ team.toString() }}</option>
        </select>
    </div>
    <div>
        <p>Spieler {{ gameParticipation.playerId }} war {{ gameParticipation.team.toString() }}</p>
    </div>
</template>

<style>

</style>