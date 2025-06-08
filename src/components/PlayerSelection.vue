<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerSelectionStore } from '@/stores/playerSelectionStore';
import { useRoundStore } from '@/stores/round'
import type { Player } from '@/types'

const store = usePlayerSelectionStore();
const roundStore = useRoundStore();
const round = computed(() => roundStore.round)
const players = round.value.players

// Return players not already selected, or the one currently selected at index
function getAvailablePlayers(currentIndex: number) {
  const selectedIds = store.selectedPlayers
    .map(p => p?.id)
    .filter(id => id !== undefined && id !== null);

  return players.filter(
    player =>
      !selectedIds.includes(player.id) ||
      store.selectedPlayers[currentIndex]?.id === player.id
  );
}

// Handle selection by looking up the full player object
function handleSelection(index: number, playerId: number) {
  const player = players.find(p => p.id === playerId) as Player || null;
  store.updateSelection(index, player);
}

</script>

<template>
  <div>
    <div v-for="(selected, index) in store.selectedPlayers" :key="index">
      <select
        :value="selected?.id ?? ''"
        @change="e => handleSelection(index, parseInt((e.target as HTMLSelectElement)?.value))"
      >
        <option disabled value="">Select a player</option>
        <option
          v-for="player in getAvailablePlayers(index)"
          :key="player.id"
          :value="player.id"
        >
          {{ player.displayName }}
        </option>
      </select>
    </div>
  </div>
</template>
