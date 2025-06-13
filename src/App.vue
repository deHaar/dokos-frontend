<script setup lang="ts">
import EnterGame from './components/EnterGame.vue';
import HelloWorld from './components/HelloWorld.vue'
import Round from './components/Round.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/four-aces.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="DokOS" />
    </div>
  </header>

  <main>
    <!-- <TheWelcome /> -->
     <div class="wrapper">
        <Round />
      </div>
  </main>

  <footer>
    <div>
      <EnterGame />
    </div>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
