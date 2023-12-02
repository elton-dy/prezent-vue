import { ref,watch } from 'vue';

export const conversations = ref(JSON.parse(sessionStorage.getItem('conversations')) || []);
export const currentConversationId = ref(null);


watch(conversations, (newConversations) => {
    sessionStorage.setItem('conversations', JSON.stringify(newConversations));
}, { deep: true });

const saveConversationsToLocalStorage = () => {
    sessionStorage.setItem('conversations', JSON.stringify(conversations.value));
};

export function setCurrentConversationId(id) {
    currentConversationId.value = id;
}

export function getCurrentConversationId() {
    return currentConversationId.value;
}
export function addConversation(newConversation) {
    const existingIndex = conversations.value.findIndex(c => c.id === newConversation.id);
    if (existingIndex !== -1) {
        // Mettre à jour la conversation existante
        conversations.value[existingIndex] = newConversation;
    } else {
        // Ajouter une nouvelle conversation
        conversations.value.push(newConversation);
    }
}

export function setConversations(newConversations) {
    conversations.value = newConversations;
    saveConversationsToLocalStorage();
}
export function getConversationById(id) {
    // console.log("getConversationById:", id);
    // console.log("getConversationById:", conversations.value);
    return conversations.value.find(conversation => conversation.id === id);
}