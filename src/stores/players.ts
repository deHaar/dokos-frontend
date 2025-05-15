import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import testPlayers from '@/json/TestPlayers.json'

export interface Player {
    displayName: string
}

export const usePlayerStore = defineStore('players', () => {
    // define state
    const players = [] as Player[]
    // define getters
    const playerCount = computed(() => players.length)
    // define actions
    function add(player: Player) {
        players.push(player)
    }

    return { players, playerCount, add }
})