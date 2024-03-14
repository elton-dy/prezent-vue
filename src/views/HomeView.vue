<template>
  <div class="flex">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <div class="min-w-[300px] relative h-screen w-full home-main">
      <div class="relative chat-wrapper flex h-screen flex-col">
        <div class="flex items-center justify-center h-20">
          <h1 class="max-w-screen-md"> <img src="../assets/baseline.png"></h1>
        </div>

        <div class="flex-1 overflow-y-auto max-w-screen-md mr-auto ml-auto w-full"       id="style-3">
          <chat-component
            v-if="currentConversation"
            :messages="currentConversation.messages"
            :is-loading="isLoading">
          >
          </chat-component>
        </div>
        <div class="bg-slate-300 flex items-center justify-center">
          <div class="w-full max-w-screen-md">
            <MessageInputComponent @send="handleNewUserMessage"></MessageInputComponent>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import apiClient from "../services/api";
import ChatComponent from "../components/ChatComponent.vue";
import {onMounted,onBeforeMount, ref,watch} from "vue";
import MessageInputComponent from "../components/MessageInputComponent.vue";
import SidebarsComponent from "../components/SidebarsComponent.vue"; 
import {addConversation, conversations, getConversationById,currentConversationId} from "../stores/conversationsStore";

export default {
  name: 'HomePage',
  components: {MessageInputComponent, ChatComponent,SidebarsComponent},
  data() {
    return {
      // other data properties if needed
    };
  },

  setup() {
    const isLoading = ref(false);
    const currentConversation = ref(null);
    async function handleNewUserMessage(newMessage) {

      isLoading.value = true;
      // Préparer le message de l'utilisateur
      const userMessage = {
        text: newMessage,
        type: 'Human',
        timestamp: new Date().toISOString(),
      };

      if (currentConversation.value) {
        currentConversation.value.messages.push(userMessage);
      }
      const visitorUuid = JSON.parse(sessionStorage.getItem('visitorInfo')).uuid
      const messageData = {
        conversation: currentConversation.value.id,
        text: newMessage,
        type: 'Human',
        visitor_uuid: visitorUuid
      };
      console.log("messageData:", currentConversation);
      // Envoyer le nouveau message à l'API et attendre la réponse
      try {
        const response = await apiClient.post('/messages/', messageData);
        // Mettre à jour la conversation avec la réponse de l'API

        if (response && response.data) {
          // console.log(response)
          currentConversation.value.messages.push({
            text: response.data['ai_response'],
            product_details: response.data['product_details'],
            type: response.data['type'],
            timestamp: response.data.timestamp,
          });
        }
        isLoading.value = false;
      } catch (error) {
        console.error('Error sending message:', error);
        isLoading.value = false;
      }
    }

    // Function to load or start a new conversation
    async function loadOrCreateConversation() {
      if (conversations.value.length > 0) {
        currentConversationId.value = conversations.value[conversations.value.length - 1].id;
      } 
      
      if (sessionStorage.getItem('user')) {
        try {
          const userId = JSON.parse(sessionStorage.getItem('user')).id;
          console.log(`Bearer ${sessionStorage.getItem('token')}`)
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
          const response = await apiClient.post('/conversations/', { user: userId ,name: 'Bienvenue' });
          addConversation(response.data); // Mise à jour du store global
          currentConversationId.value = response.data.id;
        } catch (error) {
          console.error('Error starting a new conversation:', error);
        }
      } else {
        try {
          const visitorUuid = JSON.parse(sessionStorage.getItem('visitorInfo')).uuid;
          const response = await apiClient.post('/conversations/', { visitor_uuid: visitorUuid ,name: 'Bienvenue' });
          addConversation(response.data); // Mise à jour du store global
          currentConversationId.value = response.data.id;
        } catch (error) {
          console.error('Error starting a new conversation:', error);
        }
      }

      // Mise à jour de currentConversation basée sur currentConversationId
      currentConversation.value = getConversationById(currentConversationId.value);
    }
    const checkVisitor = async () => {
      const isConnected = !!sessionStorage.getItem('user');
      if (!isConnected && !sessionStorage.getItem('visitorInfo')) {
        await createVisitor();
      }
    };

    const createVisitor = async () => {
      try {
        const response = await apiClient.post('/visitors/');
        sessionStorage.setItem('visitorInfo', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error creating visitor:', error);
      }
    };
    onMounted(async () => {
      await checkVisitor();
      await loadOrCreateConversation();
    });

    watch(currentConversationId, (newId) => {
      currentConversation.value = getConversationById(newId);
    });

    return {
      handleNewUserMessage,
      isLoading,
      currentConversation
    };
  },
};
</script>

<style>



#style-3::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

#style-3::-webkit-scrollbar
{
  width: 5px;
  background-color: #F5F5F5;
}

#style-3::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-image: -webkit-gradient(linear,
  left bottom,
  left top,
  color-stop(0.44, rgb(122,153,217)),
  color-stop(0.72, rgb(73,125,189)),
  color-stop(0.86, rgb(28,58,148)));
}

</style>