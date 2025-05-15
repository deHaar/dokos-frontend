<script setup lang="ts">
    import { ref } from 'vue'
    import { usePlayerStore } from '@/stores/players'
    import type { Player } from '@/stores/players'
    import testPlayers from '@/json/TestPlayers.json'

    interface Game {
        forehand: [Player, boolean]
        secondHand: [Player, boolean]
        thirdHand: [Player, boolean]
        backhand: [Player, boolean]
        value: number
        bocks: number
    }

    const playerStore = usePlayerStore()
    testPlayers.players.forEach(player => {
        playerStore.add(player)
        console.log(player)
    });

    playerStore.players.forEach(player => console.log('Now available in the store: ' + player.displayName))

    console.log(testPlayers)
</script>

<template>
    <div>
        <h1>Spieler-Tabelle</h1>
    </div>
    <div>
        <table class="round-table">
            <thead>
                <tr>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Player 3</th>
                    <th>Player 4</th>
                    <th colspan="2">Game</th>
                </tr>
                <tr>
                    <th>12</th>
                    <th>6</th>
                    <th>-10</th>
                    <th>-8</th>
                    <th>Value</th>
                    <th>Bock</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2</td>
                    <td>2</td>
                    <td>-2</td>
                    <td>-2</td>
                    <td>2</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>-6</td>
                    <td>-6</td>
                    <td>-2</td>
                    <td>2</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>-4</td>
                    <td>-4</td>
                    <td>-2</td>
                    <td>2</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.round-table td {
  text-align: center;
}

.round-table th {
    font-weight: bold;
}

.positive {
    color: green;
}

.negative {
    color: red;
}
</style>