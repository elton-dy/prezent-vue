<template>
  <nav>
    <aside class="flex">
      <!-- First Column -->
      <div
          class="flex h-screen w-12 flex-col items-center space-y-8 border-r border-slate-300 bg-slate-50 py-8 dark:border-slate-700 dark:bg-slate-900 sm:w-16"
      >
        <!-- Logo -->
        <RouterLink
            to="/"
            class="mb-1"
            @click="selectItem('home'), toggleSecondColumn()"
        >
          <img src="../assets/logo.png" class="h-7 w-7 text-blue-600">
        </RouterLink>
        <!-- List Gift -->
        <RouterLink
            to="/login"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'gift' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            @click="selectItem('gift')"
        >
          <img src="../assets/gift.svg" class="h-6 w-6">
        </RouterLink>
        <!-- Favori -->
        <RouterLink
            to="#"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'favori' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            @click="selectItem('favori')"
        >
          <img src="../assets/heart.svg" class="h-6 w-6">
        </RouterLink>

        <!-- User -->
        <RouterLink
            to="#"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'user' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            @click="selectItem('user')"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path
                d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
            ></path>
          </svg>
        </RouterLink>
        <!-- Settings -->
        <RouterLink
            to="#"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'parameter' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            @click="selectItem('parameter')"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
                d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
            ></path>
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          </svg>
        </RouterLink>
      </div>
      <!-- Second Column -->
      <transition name="slide">
        <div
            class="h-screen w-52 overflow-y-auto bg-slate-50 py-8 dark:bg-slate-900 sm:w-60"
            v-show="isSecondColumnVisible"
        >
          <div class="flex items-start">
            <h2
                class="inline px-5 text-lg font-medium text-slate-800 dark:text-slate-200"
            >
              Chats
            </h2>
            <span class="rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200">
          24
        </span>
          </div>

          <div class="mx-2 mt-8 space-y-4">
            <form>
              <label for="chat-input" class="sr-only">Search chats</label>
              <div class="relative">
                <input
                    id="search-chats"
                    type="text"
                    class="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    placeholder="Search chats"
                    rows="1"
                    required
                />
                <button
                    type="submit"
                    class="absolute bottom-2 right-2.5 rounded-lg p-2 text-sm text-slate-500 hover:text-blue-700 focus:outline-none sm:text-base"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 9h8"></path>
                    <path d="M8 13h5"></path>
                    <path
                        d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"
                    ></path>
                    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M20.2 20.2l1.8 1.8"></path>
                  </svg>
                  <span class="sr-only">Search chats</span>
                </button>
              </div>
            </form>

            <button
                class="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
            >
              <h1
                  class="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
              >
                Tailwind Classes
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">12 Mar</p>
            </button>

            <button
                class="flex w-full flex-col gap-y-2 rounded-lg bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:bg-slate-800"
            >
              <h1
                  class="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
              >
                explain quantum computing
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">10 Feb</p>
            </button>
            <button
                class="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
            >
              <h1
                  class="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
              >
                How to create ERP Diagram
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">22 Jan</p>
            </button>
            <button
                class="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
            >
              <h1
                  class="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
              >
                API Scaling Strategies
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
            </button>
          </div>
        </div>
      </transition>
    </aside>
  </nav>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import { RouterLink } from "vue-router";

const selectedItem = ref(null);
const isSecondColumnVisible = ref(true);

function selectItem(item) {
  selectedItem.value = item === selectedItem.value ? null : item; // Désélectionne l'item si cliqué à nouveau
}

function toggleSecondColumn() {
  isSecondColumnVisible.value = !isSecondColumnVisible.value;
}
// Fonction pour vérifier la largeur de l'écran et cacher la seconde colonne sur mobile
function checkScreenWidth() {
  if (window.innerWidth < 768) { // 768px est généralement considéré comme la largeur d'écran pour les appareils mobiles
    isSecondColumnVisible.value = false;
  }
}

onMounted(() => {
  // Vérifie la largeur de l'écran lors du montage du composant
  checkScreenWidth();
  // Ajouter un écouteur d'événements pour les changements de taille de l'écran
  window.addEventListener('resize', checkScreenWidth);
});

// S'assurer de nettoyer l'écouteur lors de la destruction du composant
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});
</script>

<style>

/* CSS for the mobile view */
@media (max-width: 767px) {
  .transition-width {
    width: 0;
    overflow: hidden;
  }
}

/* CSS for the transition */
.slide-enter-active, .slide-leave-active {
  transition: width 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  width: 0;
  overflow: hidden;
}
</style>