<template>
  <nav>
    <aside class="flex border-colors-right">
      <!-- First Column -->
      <div
          class="first-column flex h-screen w-12 flex-col items-center space-y-8 border-r border-slate-300 bg-slate-50 py-8 dark:border-slate-700 dark:bg-slate-900 sm:w-16"
      >
        <!-- Logo -->
        <RouterLink
            to="/"
            class="mb-1"
            @click="toggleSecondColumn()"
        >
          <img :src="currentImageMenu" class="h-7 w-7 text-blue-600">
        </RouterLink>
        <!-- List Gift -->
        <RouterLink
            to="/login"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'gift' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            v-if="showIcon"
            @click="selectItem('gift')"
        >
          <img src="../assets/gift.svg" class="h-6 w-6">
        </RouterLink>
        <!-- Favori -->
        <RouterLink
            to="#"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'favori' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            v-if="showIcon"
            @click="selectItem('favori')"
        >
          <img src="../assets/heart.svg" class="menu-icon h-6 w-6">
        </RouterLink>

        <!-- User -->
        <RouterLink
            to="#"
            :class="['rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800', selectedItem === 'user' ? 'bg-blue-100 text-blue-600 dark:bg-slate-800' : 'text-slate-500']"
            v-if="showIcon"
            @click="selectItem('user')"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="menu-icon h-6 w-6"
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
            v-if="showIcon"
            @click="selectItem('parameter')"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="menu-icon h-6 w-6"
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
              Conversations
            </h2>
            <span class="rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200">
          {{ conversations.length }}
        </span>
          </div>

          <div class="min-w-[160px] mx-2 mt-8 space-y-4">
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
                class="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800"
                @click="showNewMessageForm = !showNewMessageForm"
            >
              <div class="flex flx-row justify-between w-full">
                <h1
                    class="text-base font-medium capitalize text-white dark:text-slate-200"
                >
                  Nouvelle conversation
                </h1>
                <img src="../assets/add.svg">
              </div>

            </button>
            <transition name="slide-fade">

              <div v-if="showNewMessageForm" class="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 bg-slate-300">
                <form @submit.prevent="createNewConversation(newConversationName)">
                  <input v-model="newConversationName" type="text" placeholder="Nom de la conversation" class="border p-2 rounded w-full"/>
                  <button type="submit" class="bg-royal-purple/90 text-white p-2 rounded w-full">Créer</button>
                </form>
              </div>
            </transition>
            <div
                class="flex w-full flex-row gap-y-2 rounded-lg text-left overflow-hidden transition-colors duration-200 focus:outline-none dark:bg-slate-800"
                :class="{ 'bg-orange-100': selectedConversationId === conversation.id, 'bg-slate-200': selectedConversationId !== conversation.id }"
                v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation.id)"
            >
              <button class="flex w-full flex-col px-3 py-2">
                <h1
                    class="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
                >
                  {{ conversation.name }}
                </h1>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatTimestamp(conversation.timestamp) }}</p>
              </button>
              <div
                  class="bg-red-500 w-14 flex justify-center"
                  v-if="conversations.length > 1 && selectedConversationId !== conversation.id"
                  @click.stop="deleteConversation(conversation.id)"
              >
                <img src="../assets/delete.svg" class="max-w-[62%] ">
              </div>
            </div>

          </div>
        </div>
      </transition>
    </aside>
  </nav>
</template>

<script>
import {ref, onMounted, onUnmounted} from 'vue';
import { RouterLink } from "vue-router";
import apiClient from "../services/api";
import { conversations, addConversation,setCurrentConversationId,removeConversation } from "../stores/conversationsStore";

export default {
  name: 'SidebarsComponent',
  components: {
    RouterLink
  },
  setup(){
    const selectedItem = ref(null);
    const isSecondColumnVisible = ref(true);
    const showIcon = ref(false);
    const showNewMessageForm = ref(false);
    const newConversationName = ref('');

    const currentImageMenu = ref(new URL('@/assets/close.svg', import.meta.url).href);
    const selectedConversationId = ref(null);

    function addNewConversation() {
      // Logique pour ajouter une nouvelle conversation
      showNewMessageForm.value = false;
    }
    function selectItem(item) {
      selectedItem.value = item === selectedItem.value ? null : item; // Désélectionne l'item si cliqué à nouveau
    }

    function toggleSecondColumn() {
      isSecondColumnVisible.value = !isSecondColumnVisible.value;
      const closeIcon = new URL('@/assets/close.svg', import.meta.url).href;
      const menuIcon = new URL('@/assets/menu.svg', import.meta.url).href;
      currentImageMenu.value = isSecondColumnVisible.value ? closeIcon : menuIcon;
    }
    // Fonction pour vérifier la largeur de l'écran et cacher la seconde colonne sur mobile
    function checkScreenWidth() {
      if (window.innerWidth < 768) {
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

    async function deleteConversation(conversationId) {
      try {
        // Supprimer la conversation via l'API
        const visitorUuid = JSON.parse(sessionStorage.getItem('visitorInfo')).uuid;
        await apiClient.delete(`/conversations/${conversationId}`,{params: {visitor_uuid: visitorUuid}});
        // Supprimer la conversation du store
        removeConversation(conversationId);
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    }
    async function createNewConversation(conversationName) {
      try {
        let userId;
        let visitorUuid
        let response
        // Vérifier si un utilisateur est connecté
        if (localStorage.getItem('userInfo')) {
          // Ici, remplacez 'userInfo' par la clé réelle où les informations de l'utilisateur connecté sont stockées
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          userId = userInfo.id;
        } else {
          // Gérer le cas d'un visiteur
          const visitorInfo = JSON.parse(sessionStorage.getItem('visitorInfo'));
          visitorUuid = visitorInfo.uuid;
        }

        const payload = userId ? { user: userId, name: conversationName } : { visitor_uuid: visitorUuid, name: conversationName };
        response = await apiClient.post('/conversations/', payload);

        let newConversation = {};
        newConversation = {
          ...response.data,
        };
        addConversation(newConversation);
        showNewMessageForm.value = false;
        setCurrentConversationId(response.data.id);
      } catch (error) {
        console.error('Error creating a new conversation:', error);
      }
    }
    function selectConversation(conversationId) {
      selectedConversationId.value = conversationId;
      setCurrentConversationId(conversationId);
    }

    function formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    return {
      selectedItem,
      isSecondColumnVisible,
      showNewMessageForm,
      newConversationName,
      selectItem,
      toggleSecondColumn,
      addNewConversation,
      checkScreenWidth,
      createNewConversation,
      conversations,
      selectConversation,
      formatTimestamp,
      deleteConversation,
      currentImageMenu,
      selectedConversationId,
      showIcon
    }
  }

}

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

.first-column{
  background-image: url("../assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.menu-icon{
  color: black;
}
.border-colors {
  border-image: linear-gradient(45deg, #5E17EB, #FF6E40, #5E17EB, #FF6E40) 1 !important;
  border: 2px solid;
  border-radius: 0.5rem;
}

.border-colors::before {
  border-image: linear-gradient(45deg, #5E17EB, #FF6E40, #5E17EB, #FF6E40) 1 !important;
}

.border-colors-right {
  border-image: linear-gradient(45deg, #5E17EB, #FF6E40, #5E17EB, #FF6E40) 1 !important;
  border-right: 2px solid;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>