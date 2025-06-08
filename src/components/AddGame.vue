<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoundStore } from '@/stores/round'
import type { Round, Player, Game, GameParticipant } from "@/types"
import PlayerSelection from '@/components/PlayerSelection.vue'

const store = useRoundStore()
const round = computed(() => store.round)
// const unselected = ref(round.value.players)

// round.value.players.forEach(player => {
//     unselected.value.push(player)
// });

const mixerId = ref<number | null>(null)
const gameValue = ref<number>(0)
const bocks = ref<number>(0)
const winner = ref<'RE' | 'KONTRA'>('RE')

const positions = ['forehand', 'secondHand', 'thirdHand', 'backhand'] as const

type Position = typeof positions[number]

const participants = ref<Record<Position, { playerId: number | null; re: boolean }>>({
    forehand: { playerId: null, re: false },
    secondHand: { playerId: null, re: false },
    thirdHand: { playerId: null, re: false },
    backhand: { playerId: null, re: false },
})

// Construct a Game object
function addGame() {
    const newGame: Game = {
        id: Date.now(),
        mixerId: mixerId.value!,
        value: gameValue.value,
        bocks: bocks.value,
        forehand: toParticipant('forehand'),
        secondHand: toParticipant('secondHand'),
        thirdHand: toParticipant('thirdHand'),
        backhand: toParticipant('backhand'),
    }

    round.value.games.push(newGame)
    console.log('Game added:', newGame)
}

function toParticipant(pos: Position): GameParticipant {
    const { playerId, re } = participants.value[pos]
    return {
        playerId: playerId!,
        points: 0,
        re,
        won: re === (winner.value === 'RE'),
    }
}

// function addGameResult(
//     mixerId: number,
//     forehand: GameParticipant,
//     secondHand: GameParticipant,
//     thirdHand: GameParticipant,
//     backhand: GameParticipant,
//     value: number,
//     bocks: number
// ) {
//     store.addGame(
//         {
//             mixerId: mixerId,
//             forehand: forehand,
//             secondHand: secondHand,
//             thirdHand: thirdHand,
//             backhand: backhand,
//             value: value,
//             bocks: bocks
//         }
//     )
// }

function add() {
    // let game: Game
    // let mixerId: number
    // let forehand: GameParticipant
    // let secondHand: GameParticipant
    // let thirdHand: GameParticipant
    // let backhand: GameParticipant

    // if (document.getElementById('gameValue')) {
    //     let v = document.getElementById('gameValue')
    // }

    store.addGame({
        mixerId: 4,
        forehand: { playerId: 5, won: false, re: false, points: -4 },
        secondHand: { playerId: 1, won: true, re: true, points: 12 },
        thirdHand: { playerId: 2, won: false, re: false, points: -4 },
        backhand: { playerId: 3, won: false, re: false, points: -4 },
        value: 5,
        bocks: 0
    } as Game
    )
}
</script>

<template>
    <div class="wrapper" padding="10">
        <PlayerSelection padding="10" />
    </div>
    <div class="wrapper">
        <table>
            <thead padding="10">
                <tr>
                    <th colspan="2">Neues Spiel</th>
                    <th>
                        <label>Gewonnen hat:
                            <select v-model="winner">
                                <option id="re">RE</option>
                                <option id="kontra">KONTRA</option>
                            </select>
                        </label>
                    </th>
                </tr>
                <tr>
                    <td align="right">Mischer: </td>
                    <!-- <td><select><option v-for="player in round.players" :value="player.displayName">{{ player.displayName }}</option></select></td> -->
                    <td>
                        <select v-model.number="mixerId">
                            <option :value="null">--</option>
                            <option v-for="player in round.players" :key="player.id" :value="player.id">{{
                                player.displayName }}</option>
                        </select>
                    </td>
                    <td><label>Spielwert: <input type="number" id="gameValue" name="quantity" min="0" max="99"
                                placeholder="0"></label></td>
                    <td><label>Bocks: ??</label></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="right">Vorhand: </td>
                    <td><select>
                            <option v-for="player in round.players" :value="player.displayName">{{ player.displayName }}
                            </option>
                        </select></td>
                    <td>
                        <select>
                            <option id="re">RE</option>
                            <option id="kontra">KONTRA</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right">Zweithand: </td>
                    <td><select>
                            <option v-for="player in round.players" :value="player.displayName">{{ player.displayName }}
                            </option>
                        </select></td>
                    <td>
                        <select>
                            <option id="re">RE</option>
                            <option id="kontra">KONTRA</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right">Dritthand: </td>
                    <td><select>
                            <option v-for="player in round.players" :value="player.displayName">{{ player.displayName }}
                            </option>
                        </select></td>
                    <td>
                        <select>
                            <option id="re">RE</option>
                            <option id="kontra">KONTRA</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right">Hinterhand: </td>
                    <td><select>
                            <option v-for="player in round.players" :value="player.displayName">{{ player.displayName }}
                            </option>
                        </select></td>
                    <td>
                        <select>
                            <option id="re">RE</option>
                            <option id="kontra">KONTRA</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
            </tbody>
            <tfoot>
                <tr align="center">
                    <td colspan="4"><button @click="add()">Neues Spiel eintragen</button></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<style></style>