<template>
  <div
      class="flex-1 space-y-6 overflow-y-auto rounded-xl  p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7"
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
          message.type !== 'Human' ? 'flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl border-colors-message' : 'flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-royal-purple/20 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl border-colors-message',
        ]"
          class=""
      >
        <!-- Afficher le message normalement -->
        <p v-if="!message.product_details || message.product_details.length === 0">{{message.text}}</p>

        <!-- Afficher la carte du produit si les détails du produit sont disponibles -->

        <div v-else class="product-card-container ">
          <p>{{message.text}}</p>
          <div class="product-card border-2 border-flame-orange/50 w-60 flex flex-col bg-slate-100 rounded-lg overflow-hidden relative" v-for="(product, productIndex) in message.product_details" :key="`product-${productIndex}`">
            <div class="absolute top-2 left-2">
              <button @click="toggleLike(productIndex)" class="text-flame-orange hover:text-mustard-yellow">
                <!-- Vous pouvez utiliser une icône SVG ou une classe d'icônes (comme FontAwesome) ici -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
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
  methods: {
    // async handleLike(productId) {
    //   const response = await apiClient.post('/product/', { visitor_uuid: visitorUuid ,name: 'Bienvenue' });
    //   axios.post(`YOUR_API_ENDPOINT/likes`, {
    //     productId: productId
    //   })
    //   .then(response => {
    //     // Gérer la réponse, par exemple, mettre à jour le nombre de likes dans l'état du composant
    //     console.log(response.data);
    //     // Mettez à jour l'état de votre composant ici
    //   })
    //   .catch(error => {
    //     console.error("There was an error registering the like: ", error);
    //   });
    // }
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

.border-colors-message {
  border-image: linear-gradient(45deg, #5E17EB, #FF6E40, #5E17EB, #FF6E40) 1 !important;
  border: 2px solid;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>