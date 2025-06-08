import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Player } from '@/types'

export const usePlayerSelectionStore = defineStore('playerSelection', () => {
  // Each selection holds a player object or null
  const selectedPlayers = ref([{} as Player | null, {} as Player | null, {} as Player | null, {} as Player | null]);

  function updateSelection(index: number, player: Player) {
    selectedPlayers.value[index] = player;
  }

  return {
    selectedPlayers,
    updateSelection,
  };

  function add(player: Player) {
    
  }
});