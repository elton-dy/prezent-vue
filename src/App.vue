<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SidebarsComponent from "./components/SidebarsComponent.vue";
</script>

<template>
  <div class="app-container">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
}

header {
  /* styles pour le header */
}

main {
  /* styles pour le corps de la page */
}
</style>
