import { defineStore } from "pinia";
import { ref } from "vue";
import type { Player } from "@/types";

export const usePlayerSelectionStore = defineStore("playerSelection", () => {
  const selectedPlayers = ref({
    forehand: {} as Player | null,
    secondHand: {} as Player | null,
    thirdHand: {} as Player | null,
    backhand: {} as Player | null,
  });

  function updateSelection(position: string, player: Player | null) {
    selectedPlayers.value[position] = player;
  }

  return {
    selectedPlayers,
    updateSelection,
  };
});
