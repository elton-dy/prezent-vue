<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <div class="chat-wrapper">
      <chat-component :messages="conversation.messages"></chat-component>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/api";
import ChatComponent from "../components/ChatComponent.vue";
import {onMounted,onBeforeMount, ref} from "vue";

export default {
  name: 'HomePage',
  components: {ChatComponent},
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
