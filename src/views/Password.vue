<template>
    <div class="signup flex flex-col items-center">
      <div class="w-screen px-8">
        <router-link to="/" class="mt-4 text-xs text-green-800">&lt; retour</router-link>
      </div>
      <h1 class="mt-2.5 mb-7">Réinitialiser le mot de passe</h1>
  
      <form @submit.prevent="register" class="form px-8">
  
        <div class="flex flex-wrap -mx-3 mb-6 ">
          <div class="w-full px-3 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
              Email
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="email" type="text" id="email"  placeholder="Adresse electronique">
            <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</p>
          </div>
        </div>

        <div class="flex flex-col items-center">
          <button type="submit"
          class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
          Réinitialiser
          </button>
        </div>
  
        <div v-if="error" style="color: red">{{ error }}</div>
  
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from "../services/api";
  export default {
    data() {
      return {
        email: '',
        errors: {
          email: '',
        },
        error: ''
      };
    },
    methods: {
      async register() {
        this.resetErrors();
  
        this.validateForm();
  
        if (Object.values(this.errors).every(value => value === '')) {
          try {
            const response = await apiClient.post('/password_reset/', { email: this.email });
            console.log("Utilisateur enregistré avec succès!", response.data);
          } catch (error) {
            console.error("Il y a eu une erreur lors de l'enregistrement:", error);
          }
        }
      },
      resetErrors() {
        this.errors = {
          email: '',
        };
      },
      validateForm() {
        if (!this.email) {
          this.errors.email = "Veuillez entrer une adresse e-mail.";
        } else if (!this.validateEmail(this.email)) {
          this.errors.email = "Veuillez entrer une adresse e-mail valide.";
        }
      },
      validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
    },
  };
  </script>
  
  <style>
  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 54px;
    letter-spacing: 0em;
  }
  </style>