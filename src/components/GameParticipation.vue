<script setup lang="ts">
import { computed, type PropType, reactive, ref } from 'vue'
import { Team, type GameParticipator } from '@/types'
import { useRoundStore } from '@/stores/round'
import ReKontraSwitch from '@/components/ReKontraSwitch.vue'

// const props = defineProps<{
//     playerId: number,
//     team: Team
// }>()

const playerId = ref<number>(-1)
const team = ref<Team>(Team.KONTRA)

const emit = defineEmits<{
  (e: 'update:playerId', value: number): void
  (e: 'update:team', value: Team): void
}>()

const roundStore = useRoundStore()
const round = computed(() => roundStore.round)

function log(pos: string) {
    console.log(pos + ' updated: [' + playerId.value + ', ' +  team.value.toString() + ']')
}
</script>

<template>
    <div class="container">
        <select v-model="playerId" @change="emit('update:playerId', playerId), log('playerId')">
            <option :value="-1">--- auswählen ---</option>
            <option v-for="player in round.players" :key="player.id" :value="player.id">
                {{ player.displayName }}
            </option>
        </select>
        <ReKontraSwitch v-model:selected-team="team" @update:selected-team="emit('update:team', team), log('team')"/>
    </div>
</template>

<style>
.container {
  display: flex;
  column-gap: 20px;
  justify-content: space-around;
}
</style>