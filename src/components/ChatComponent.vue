<template>
  <div
      class="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7"
  >
    <div
        v-for="(message, index) in messages"
        :key="index"
        :class="message.type === 'Human' ? 'flex-row-reverse' : 'flex'"
        class="flex items-start"
    >
      <img
          :src="message.type === 'Human' ? userAvatar : aiAvatar"
          class="mr-2 h-8 w-8 rounded-full"
          :alt="message.type"
      />
      <div
          :class="[
          '',
          message.type !== 'Human' ? 'flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl bg-royal-purple/20' : 'flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl',
        ]"
          class=""
      >
        <p>{{message.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from 'vue';
export default {
  name: 'ChatComponent',
  props: {
    messages: null,
  },

  setup() {
    // console.log(props.messages)
    const userAvatar = 'https://dummyimage.com/128x128/354ea1/ffffff&text=U'; // User avatar URL
    const aiAvatar = 'https://dummyimage.com/128x128/363536/ffffff&text=A'; // AI avatar URL

    // Load conversation history
    // function loadHistory() {
    // // Example: Load history from local storage or another source
    //   const history = localStorage.getItem('chatHistory');
    //   if (history) {
    //     let messages;
    //     messages.value = JSON.parse(history);
    //   }
    // }

    // Call loadHistory on component mount
    // loadHistory();

    // Return reactive variables and functions
    // let messages;
    return { userAvatar, aiAvatar };

  }
};
</script>