import { ref } from 'vue';

export const conversations= ref([]);

export function addConversation(newConversation) {
    console.log("Avant d'ajouter la conversation", conversations.value);
    conversations.value.push(newConversation);
    console.log("Après avoir ajouté la conversation", conversations.value);
}

export function setConversations(newConversations) {
    conversations.value = newConversations;
}
export function getConversationById(id) {
    console.log("getConversationById:", id);
    console.log("getConversationById:", conversations.value);
    return conversations.value.find(conversation => conversation.id === id);
}