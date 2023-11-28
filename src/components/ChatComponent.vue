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
        <p v-if="!message.product_details || message.product_details.length === 0">{{message.text}}</p>

        <!-- Afficher la carte du produit si les détails du produit sont disponibles -->

        <div v-else class="product-card-container">
          <p>{{message.text}}</p>
          <div class="product-card w-64 flex flex-col bg-slate-100 rounded-lg overflow-hidden" v-for="(product, productIndex) in message.product_details" :key="`product-${productIndex}`">
            <div class="product-card-img-container flex">
              <img v-if="!product.image_url" class="product-card-img " src="https://positiveprints.com/wp-content/smush-webp/2023/09/Carte-Lieu-de-Rencontre-1024x1024.jpg.webp">
              <img v-else class="product-card-img " :src="product.image_url">
            </div>
            <div class="flex flex-col items-center">
              <h3>{{ product.name }}</h3>
              <p>{{ product.target_budget }}</p>
              <button
                  @click="openProductLink(product.link)"
                  class="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-slate-50 hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <a :href="product.link" target="_blank">Acheter</a>
              </button>

            </div>
          </div>

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

<style>
.product-card-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card{
  cursor: pointer;
}
</style>