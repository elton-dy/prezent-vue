import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            conversations: []
        };
    },
    mutations: {
        addConversation(state, conversation) {
            state.conversations.push(conversation);
        },
        setCurrentConversation(state, conversationId) {
            // Logique pour définir la conversation actuelle par son ID
        }
        // Ajoutez d'autres mutations au besoin
    },
    actions: {
        createConversation({ commit }, conversationData) {
            // Logique pour créer une nouvelle conversation
            commit('addConversation', conversationData);
        }
        // Ajoutez d'autres actions au besoin
    },
    getters: {
        getConversationById: (state) => (id) => {
            return state.conversations.find(conversation => conversation.id === id);
        }
        // Ajoutez d'autres getters au besoin
    }
});
