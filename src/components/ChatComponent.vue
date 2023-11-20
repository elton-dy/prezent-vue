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
          message.type !== 'Human' ? 'flex rounded-b-xl rounded-tr-xl bg-royal-purple/20 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl' : 'flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl',
        ]"
          class=""
      >
        <!-- Afficher le message normalement -->
        <p v-if="!message.product_details">{{message.text}}</p>

        <!-- Afficher la carte du produit si les détails du produit sont disponibles -->
        <div v-else class="product-card " @click="openProductLink(message.product_details.link)">
          <img src="https://www.leparisien.fr/resizer/zzHBFj04fm1uJSz4XYZR0WJwIIk=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/QNJ77JCHAFCUHPTGB6ZC7Z5LA4.jpg">
          <h3>{{ message.product_details.name }}</h3>
          <p>{{ message.product_details.description }}</p>
          <a :href="message.product_details.link" target="_blank">Acheter maintenant</a>
          <!-- Ajoutez ici d'autres informations du produit si nécessaire -->
        </div>

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

    function openProductLink(link) {
      if (link) {
        window.open(link, '_blank');
      }
    }

    return { userAvatar, aiAvatar,openProductLink };

  }
};
</script>