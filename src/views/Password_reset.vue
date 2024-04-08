<template>
    <div class="signup flex flex-col items-center">
      <div class="w-screen px-8">
        <router-link to="/" class="mt-4 text-xs text-green-800">&lt; retour</router-link>
      </div>
      <h1 class="mt-2.5 mb-7">Réinitialiser le mot de passe</h1>
  
      <form @submit.prevent="register" class="form px-8">
  
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
            Nouveau mot de passe
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.password" type="password" id="password"  placeholder="Mot de passe">
          <p v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password }}</p>
        </div>
      </div>
  
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="confirmPassword">
            Confirmer le mot de passe
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.confirmPassword" id="confirmPassword" type="password"  placeholder="Confirmer le mot de passe">
          <p v-if="errors.confirmPassword" class="text-red-500 text-xs italic">{{ errors.confirmPassword }}</p>
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
  import { useRoute } from 'vue-router';
  export default {
    setup() {
      const route = useRoute();
      const token = route.query.token;

      return {
        token
      }
    },
    data() {
      return {
        user: {
          password: "",
          confirmPassword: "",
        },
        errors: {
          password: '',
          confirmPassword: '',
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
            const response = await apiClient.post(`/password-reset-confirm/${this.token}/`, {
              new_password: this.user.password,
            });
            console.log("Mot de passe réinitialisé avec succès!", response.data);
          } catch (error) {
            if (error.response && error.response.data.error) {
              this.error = error.response.data.error;
            } else {
              this.error = "Une erreur est survenue lors de la réinitialisation du mot de passe.";
            }
            console.error("Il y a eu une erreur lors de la réinitialisation du mot de passe:", error);
          }
        }
      },
      resetErrors() {
        this.errors = {
          password: '',
          confirmPassword: '',
        };
      },
      validateForm() {
        if (!this.user.password) {
          this.errors.password = "Veuillez entrer un mot de passe.";
        } else if (this.user.password.length < 8) {
          this.errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }
  
        if (!this.user.confirmPassword) {
          this.errors.confirmPassword = "Veuillez confirmer votre mot de passe.";
        } else if (this.user.password !== this.user.confirmPassword) {
          this.errors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }
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