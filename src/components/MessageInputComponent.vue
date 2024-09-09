<template>
  <form @submit.prevent="handleSendMessage">
    <label for="chat-input" class="sr-only">Décrivez la personne et l'occasion du cadeau</label>
    <div class="relative">
    <textarea
        id="chat-input"
        v-model="userMessage"
        @input="autoGrow"
        @keydown.enter.prevent="handleSendMessageOnEnter"
        class="block w-full resize-none rounded-xl border-none bg-slate-50 p-4 pr-16 text-sm text-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-500 sm:text-base"
        placeholder="Saisissez votre prompt"
        rows="1"
        required
    ></textarea>
      <button
          type="submit"
          class="absolute bottom-2 right-2.5 rounded-full bg-royal-purple/80 p-2 text-sm font-medium text-slate-200 hover:bg-royal-purple focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 14l11 -11"></path>
          <path
              d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
          ></path>
        </svg>
        <span class="sr-only">Send message</span>
      </button>
    </div>
  </form>
</template>

<script>
import {ref, onMounted, onUnmounted} from 'vue';
export default {
  name: 'MessageInputComponent',
  emits: ['send'],
  setup(props, { emit }) {
    const userMessage = ref('');

    function handleSendMessage() {
      if (userMessage.value.trim()) {
        // Émettre un événement avec le message de l'utilisateur
        emit('send', userMessage.value);
        // Réinitialiser le champ de saisie
        userMessage.value = '';
      }
    }
    function autoGrow(event) {
      event.target.style.height = 'auto'; // Réinitialiser la hauteur
      event.target.style.height = event.target.scrollHeight + 'px'; // Ajuster en fonction du contenu
    }
    // Méthode pour gérer l'envoi du message avec la touche Entrée
    function handleSendMessageOnEnter(event) {
      //  sauts de ligne dans le textarea
      if (!event.shiftKey) {
        handleSendMessage();
      }
    }
    return {
      userMessage,
      handleSendMessage,
      handleSendMessageOnEnter,
      autoGrow
    };
  },
}
</script>

<style>
textarea {
  max-height: 150px;
  overflow-y: auto;
}
</style>