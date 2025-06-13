<script setup lang="ts">
import { computed, type PropType, reactive, ref, withDefaults } from 'vue'
import { Team, type GameParticipator } from '@/types'
import { useRoundStore } from '@/stores/round'
import ReKontraSwitch from '@/components/ReKontraSwitch.vue'
import GameParticipant from './GameParticipant.vue'

const playerId = defineModel('playerId', { default: -1, required: true })
const team = defineModel('team', { default: Team.KONTRA, required: true })

const emit = defineEmits<{
  (e: 'update:playerId', value: number): void
  (e: 'update:team', value: Team): void
}>()

const roundStore = useRoundStore()
const round = computed(() => roundStore.round)

function log(pos: string) {
    console.log(pos + ' updated: [' + playerId + ', ' +  team.toString() + ']')
}
</script>

<template>
    <div>
        <select v-model="playerId" @change="emit('update:playerId', playerId)">
            <option :value="-1">--- Geber ---</option>
            <option v-for="player in round.players" :key="player.id" :value="player.id">
                {{ player.displayName }}
            </option>
        </select>
        <ReKontraSwitch v-model:selected-team="team" @update:selected-team="emit('update:team', team)"/>
    </div>
</template>

<style>

</style>