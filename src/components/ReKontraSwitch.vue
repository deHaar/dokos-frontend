<script setup lang="ts">
import { Team } from '@/types'

const props = defineProps<{
  selectedTeam: Team
}>()

const emit = defineEmits<{
  (e: 'update:selectedTeam', value: Team): void
}>()

function onToggle(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:selectedTeam', checked ? Team.RE : Team.KONTRA)
}
</script>

<template>
    <div class="toggle-wrapper">
    <span :class="{ active: selectedTeam === Team.KONTRA }">KONTRA</span>

    <label class="switch">
      <input
        type="checkbox"
        :checked="selectedTeam === Team.RE"
        @change="onToggle"
      />
      <span class="slider"></span>
    </label>

    <span :class="{ active: selectedTeam === Team.RE }">RE</span>
  </div>
</template>

<style>
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

span.active {
  color: #2196F3;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px; width: 18px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>