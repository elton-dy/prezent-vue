<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SidebarsComponent from "./components/SidebarsComponent.vue";
</script>

<template>
  <div class="w-full flex">
    <main class="relative flex h-screen max-w-full flex-1 flex-col overflow-hidden">
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
