<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SidebarsComponent from "./components/SidebarsComponent.vue";
</script>

<template>
  <div class="w-full flex">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <main class="w-full">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

header {
  /* styles pour le header */
}

main {
  /* styles pour le corps de la page */
}
</style>
