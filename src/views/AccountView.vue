<template>
    <div class="profile flex flex-col items-center">
      <div class="w-screen px-8">
        <router-link to="/" class="mt-4 text-xs text-green-800">&lt; retour</router-link>
      </div>
      <h1 class="mt-2.5 mb-7">Mon compte</h1>
  
      <form @submit.prevent="updateProfile" class="form px-8 w-full max-w-md">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
              Email
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.email" type="email" id="email" placeholder="Adresse electronique" disabled>
          </div>
        </div>
  
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="first_name">
              Prénom
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.first_name" type="text" id="first_name" placeholder="Prénom">
            <p v-if="errors.first_name" class="text-red-500 text-xs italic">{{ errors.first_name }}</p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="last_name">
              Nom
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.last_name" type="text" id="last_name" placeholder="Nom">
            <p v-if="errors.last_name" class="text-red-500 text-xs italic">{{ errors.last_name }}</p>
          </div>
        </div>
  
        <div class="flex flex-col items-center">
          <button type="submit" class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800">
            Mettre à jour
          </button>
        </div>
  
        <div v-if="error" style="color: red">{{ error }}</div>
        <div v-if="success" style="color: green">{{ success }}</div>
      </form>
    </div>
  </template>

<script>
import apiClient from "../services/api";

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
      },
      errors: {
        first_name: "",
        last_name: "",
      },
      error: "",
      success: "",
    };
  },
  async created() {
    try {
      const response = await apiClient.get("/users/me");
      this.user = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      this.error = "Une erreur est survenue lors de la récupération de vos informations.";
    }
  },
  methods: {
    async updateProfile() {
      try {
        const response = await apiClient.put("/users/me", this.user);
        this.success = "Votre profil a été mis à jour avec succès.";
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
        this.error = "Une erreur est survenue lors de la mise à jour de votre profil.";
      }
    },
    validateForm() {
      this.errors = {
        first_name: "",
        last_name: "",
      };

      if (!this.user.first_name) {
        this.errors.first_name = "Veuillez entrer votre prénom.";
      }

      if (!this.user.last_name) {
        this.errors.last_name = "Veuillez entrer votre nom.";
      }
    },
  },
};
</script>