<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <div class="chat-wrapper">
      <chat-component :messages="conversation.messages"></chat-component>
    </div>
    <MessageInputComponent @send="handleNewUserMessage"></MessageInputComponent>
  </div>
</template>

<script>
import apiClient from "../services/api";
import ChatComponent from "../components/ChatComponent.vue";
import {onMounted,onBeforeMount, ref} from "vue";
import MessageInputComponent from "../components/MessageInputComponent.vue";

export default {
  name: 'HomePage',
  components: {MessageInputComponent, ChatComponent},
  data() {
    return {
      // other data properties if needed
    };
  },
  setup() {
    const conversation = ref({
      id: null,
      messages: [],
    });
    async function handleNewUserMessage(newMessage) {
      console.log('ici');
      // Ajouter le nouveau message de l'utilisateur à la conversation
      conversation.value.messages.push({
        text: newMessage,
        type: 'Human',
        timestamp: new Date().toISOString(),
        // autres propriétés si nécessaire
      });
      const messageData = {
        conversation: conversation.value.id,
        text: newMessage,
        type: 'Human'
      };
      // Envoyer le nouveau message à l'API et attendre la réponse
      try {
        const response = await apiClient.post('/messages/', messageData);
        // Mettre à jour la conversation avec la réponse de l'API

        if (response && response.data) {
          console.log(response)
          conversation.value.messages.push({
            text: response.data['ai_response'],
            type: 'AI',
            timestamp: response.data.timestamp,
          });
        }
        // Mettre à jour le stockage local
        localStorage.setItem('conversation', JSON.stringify(conversation.value));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

    // Function to load or start a new conversation
    async function loadOrCreateConversation() {
      let storedConversation = localStorage.getItem('conversation');
      if (storedConversation) {
        conversation.value = JSON.parse(storedConversation);
      } else {
        try {
          const visitorUuid = JSON.parse(localStorage.getItem('visitorInfo')).uuid;
          const response = await apiClient.post('/conversations/', { visitor_uuid: visitorUuid });
          // const r = await apiClient.get('/conversations/'+response.data.id);
          const r = await apiClient.get('/conversations/1');
          conversation.value = {
            ...r.data,
          };

          localStorage.setItem('conversation', JSON.stringify(conversation.value));
        } catch (error) {
          console.error('Error starting a new conversation:', error);
        }
      }
      console.log(conversation.value);
    }

    onMounted(loadOrCreateConversation);
    return {
      conversation,
      handleNewUserMessage,
    };
  },
  created() {
    this.checkVisitor();
  },
  methods: {
    checkVisitor() {
      const isConnected = !!localStorage.getItem('accessToken'); // Check if the user is logged in
      if (!isConnected) {
        // Check if visitor information already exists in localStorage
        if (!localStorage.getItem('visitorInfo')) {
          // No visitor info available, create a new visitor
          this.createVisitor();
        }
        // If visitorInfo exists in localStorage, do nothing
      }
    },
    createVisitor() {
      apiClient.post('/visitors/')
          .then(response => {
            // Handle the response after creating the visitor
            // Store the visitor information in localStorage
            localStorage.setItem('visitorInfo', JSON.stringify(response.data));
            // Add any other processing if necessary
          })
          .catch(error => {
            console.error('There was an error creating the visitor:', error);
          });
    }
  }
};
</script>
