<template>
  <div
      class="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7"
  >
    <div
        v-for="(message, index) in messages"
        :key="index"
        :ref="setLastMessageRef(index)"
        :class="message.type === 'Human' ? 'flex-row-reverse' : 'flex'"
        class="flex items-start"
    >
      <img
          :src="message.type === 'Human' ? userAvatar : aiAvatar"
          :class="message.type === 'Human' ? 'ml-2 h-8 w-8 rounded-full' : 'mr-2 h-8 w-8 rounded-full'"
          class=""
          :alt="message.type"
      />
      <div
          :class="[
          '',
          message.type !== 'Human' ? 'flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl' : 'flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-royal-purple/20 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl',
        ]"
          class=""
      >
        <!-- Afficher le message normalement -->
        <p v-if="!message.product_details || message.product_details.length === 0">{{message.text}}</p>

        <!-- Afficher la carte du produit si les détails du produit sont disponibles -->

        <div v-else class="product-card-container ">
          <p>{{message.text}}</p>
          <div class="product-card border-2 border-flame-orange/50 w-64 flex flex-col bg-slate-100 rounded-lg overflow-hidden" v-for="(product, productIndex) in message.product_details" :key="`product-${productIndex}`">
            <div class="product-card-img-container flex">
              <img v-if="!product.image_url" class="product-card-img " src="../assets/gift-box.png">
              <img v-else class="product-card-img " :src="product.image_url">
            </div>
            <div class="flex flex-col items-center">
              <h3 class="italic">{{ product.name }}</h3>
              <p>{{ product.target_budget }}</p>
              <button
                  @click="openProductLink(product.link)"
                  class="inline-flex items-center gap-x-2 rounded-lg mb-2 bg-flame-orange px-3 py-2 text-center text-sm font-medium text-slate-50 hover:bg-mustard-yellow focus:outline-none focus:ring focus:ring-blue-300"
              >
                <a :href="product.link" target="_blank">Découvrir</a>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>

    <div v-if="isLoading" class="flex items-start">
      <img
          :src="aiAvatar"
          class="mr-2 h-8 w-8 rounded-full"
      />
      <div class="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl">
        <div  class="loading-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted,onUpdated,nextTick} from 'vue';
export default {
  name: 'ChatComponent',
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    isLoading: Boolean
  },

  setup(props) {
    const lastMessageRef = ref(null);

    function setLastMessageRef(index) {
      return (el) => {
        if (index === props.messages.length - 1) {
          lastMessageRef.value = el;
        }
      };
    }

    function scrollToLastMessage() {
      setTimeout(() => {
        if (lastMessageRef.value) {
          lastMessageRef.value.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }

    onMounted(async () => {
      await nextTick();
      console.log("onUpdated - lastMessageRef:", lastMessageRef.value);
      scrollToLastMessage();
    });

    onUpdated(() => {
      scrollToLastMessage();
    });
    const userAvatar = 'https://dummyimage.com/128x128/354ea1/ffffff&text=U'; // User avatar URL
    const aiAvatar = new URL('@/assets/logo.png', import.meta.url).href; // AI avatar URL

    function openProductLink(link) {
      if (link) {
        window.open(link, '_blank');
      }
    }

    return { userAvatar, aiAvatar,openProductLink,setLastMessageRef};
  },

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

.loading-dots{
  display: flex;
  margin-top: 8px;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.dot {
  @apply h-2 w-2 bg-black rounded-full;
  animation: bounce 0.7s infinite;
  /* autres styles */
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}
</style>