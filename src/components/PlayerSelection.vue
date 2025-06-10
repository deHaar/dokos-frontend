<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { usePlayerSelectionStore } from "@/stores/playerSelectionStore";
import { useRoundStore } from "@/stores/round";
import type { Game, GameParticipant, Player } from "@/types";

const mixerId = ref<number | null>(null);
const gameValue = ref<number>(0);
const bocks = ref<number>(0);
const winner = ref<"RE" | "KONTRA">("RE");

const positions = ["forehand", "secondHand", "thirdHand", "backhand"] as const;

type Position = (typeof positions)[number];

const participants = ref<Record<Position, { playerId: number | null; re: boolean }>>({
  forehand: { playerId: null, re: false },
  secondHand: { playerId: null, re: false },
  thirdHand: { playerId: null, re: false },
  backhand: { playerId: null, re: false },
});

const selectionStore = usePlayerSelectionStore();
const roundStore = useRoundStore();
const round = computed(() => roundStore.round);
const players = round.value.players;

function handleSelect(position: string, playerId: number) {
  const player = players.find((p) => p.id === playerId) || null;
  selectionStore.updateSelection(position, player);
}

function getAvailablePlayers(currentKey: string) {
  const selectedIds = Object.entries(selectionStore.selectedPlayers)
    .filter(([key, player]) => key !== currentKey && player?.id)
    .map(([_, player]) => player.id);

  return players.filter(
    (player) =>
      !selectedIds.includes(player.id) ||
      selectionStore.selectedPlayers[currentKey]?.id === player.id
  );
}

const newGame = reactive<Game>({
  id: 0,
  mixerId: 0,
  forehand: { playerId: 0, points: 0, re: false, won: false },
  secondHand: { playerId: 0, points: 0, re: false, won: false },
  thirdHand: { playerId: 0, points: 0, re: false, won: false },
  backhand: { playerId: 0, points: 0, re: false, won: false },
  value: 0,
  bocks: 0
});

function add() {
  // roundStore.addGame({
  //   mixerId: 4,
  //   forehand: { playerId: 5, won: false, re: false, points: -4 },
  //   secondHand: { playerId: 1, won: true, re: true, points: 12 },
  //   thirdHand: { playerId: 2, won: false, re: false, points: -4 },
  //   backhand: { playerId: 3, won: false, re: false, points: -4 },
  //   value: 5,
  //   bocks: 0,
  // } as Game);
}

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

    // round.value.games.push(newGame)
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

function toPoints(won: boolean, gameValue: number): number {
  return won ? gameValue : -gameValue
}
</script>

<template>
  <div class="container">
    <h1>Neues Spiel eintragen</h1>
  </div>

  <div class="container">
    <div>
      <label
        >Gegeben hat:
        <select v-model.number="newGame.mixerId">
          <option :value="null">Geber wählen</option>
          <option v-for="player in round.players" :key="player.id" :value="player.id">
            {{ player.displayName }}
          </option>
        </select>
      </label>
    </div>

    <div>
      <label
        >Gewonnen hat:
        <select v-model="winner">
          <option disabled value="">Spielpartei wählen</option>
          <option id="re">RE</option>
          <option id="kontra">KONTRA</option>
        </select>
      </label>
    </div>

    <div>
      <label
        >Spielwert:
        <input type="number" v-model="newGame.value" name="quantity" min="-99" max="99" placeholder="0" />
      </label>
    </div>
  </div>

  <div class="container">
    <div padding="10" margin="10">
      <label for="forehand">Vorhand</label>
      <select
        id="forehand"
        :value="selectionStore.selectedPlayers.forehand?.id ?? ''"
        @change="e => handleSelect('forehand', parseInt((e.target as HTMLSelectElement)?.value))"
      >
        <option disabled value="">Spieler wählen</option>
        <option
          v-for="player in getAvailablePlayers('forehand')"
          :key="player.id"
          :value="player.id"
        >
          {{ player.displayName }}
        </option>
      </select>
      <select v-model="newGame.forehand.re">
        <option disabled value="">Spielpartei wählen</option>
        <option :value="true" id="forehandRe">RE</option>
        <option :value="false" id="forehandKontra">KONTRA</option>
      </select>
    </div>

    <div>
      <label for="secondHand">Zweithand</label>
      <select
        id="secondHand"
        :value="selectionStore.selectedPlayers.secondHand?.id ?? ''"
        @change="e => handleSelect('secondHand', parseInt((e.target as HTMLSelectElement)?.value))"
      >
        <option disabled value="">Spieler wählen</option>
        <option
          v-for="player in getAvailablePlayers('secondHand')"
          :key="player.id"
          :value="player.id"
        >
          {{ player.displayName }}
        </option>
      </select>
      <select>
        <option disabled value="">Spielpartei wählen</option>
        <option id="secondHandRe">RE</option>
        <option id="secondHandKontra">KONTRA</option>
      </select>
    </div>

    <div>
      <label for="thirdHand">Dritthand</label>
      <select
        id="thirdHand"
        :value="selectionStore.selectedPlayers.thirdHand?.id ?? ''"
        @change="e => handleSelect('thirdHand', parseInt((e.target as HTMLSelectElement)?.value))"
      >
        <option disabled value="">Spieler wählen</option>
        <option
          v-for="player in getAvailablePlayers('thirdHand')"
          :key="player.id"
          :value="player.id"
        >
          {{ player.displayName }}
        </option>
      </select>
      <select>
        <option disabled value="">Spielpartei wählen</option>
        <option id="thirdHandRe">RE</option>
        <option id="thirdHandKontra">KONTRA</option>
      </select>
    </div>

    <div>
      <label for="backhand">Hinterhand</label>
      <select
        id="backhand"
        :value="selectionStore.selectedPlayers.backhand?.id ?? ''"
        @change="e => handleSelect('backhand', parseInt((e.target as HTMLSelectElement)?.value))"
      >
        <option disabled value="">Spieler wählen</option>
        <option
          v-for="player in getAvailablePlayers('backhand')"
          :key="player.id"
          :value="player.id"
        >
          {{ player.displayName }}
        </option>
      </select>
      <select>
        <option disabled value="">Spielpartei wählen</option>
        <option id="backhandRe">RE</option>
        <option id="backhandKontra">KONTRA</option>
      </select>
    </div>
  </div>

  <div class="container">
      <button @click="addGame()">Neues Spiel eintragen</button>
  </div>
</template>

<style>
.container {
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
}
</style>
