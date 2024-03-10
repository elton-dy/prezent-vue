<template>
  <div class="signup flex flex-col items-center">
    <div class="w-screen px-8">
      <router-link to="/" class="mt-4 text-xs text-green-800">&lt; retour</router-link>
    </div>
    <h1 class="mt-2.5 mb-7">Créer un compte</h1>

    <form @submit.prevent="register" class="form px-8">

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 ">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
          Email
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.email" type="email" id="email"  placeholder="Adresse electronique">
        <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</p>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
          Mot de passe
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

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="first_name">
          Prénom
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.first_name" type="text" id="first_name"  placeholder="Prénom">
        <p v-if="errors.first_name" class="text-red-500 text-xs italic">{{ errors.first_name }}</p>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="last_name">
          Nom
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.last_name" type="text" id="last_name"  placeholder="Nom">
        <p v-if="errors.last_name" class="text-red-500 text-xs italic">{{ errors.last_name }}</p>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <button type="submit"
      class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-lg px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
      Connexion
      </button>
      <router-link to="/login" class="mt-4 text-sm">J'ai déjà un compte</router-link>
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
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
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
          const response = await apiClient.post('/users/', this.user);
          console.log("Utilisateur enregistré avec succès!", response.data);
        } catch (error) {
          console.error("Il y a eu une erreur lors de l'enregistrement:", errors);
        }
      }
    },
    resetErrors() {
      this.errors = {
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
      };
    },
    validateForm() {
      if (!this.user.email) {
        this.errors.email = "Veuillez entrer une adresse e-mail.";
      } else if (!this.validateEmail(this.user.email)) {
        this.errors.email = "Veuillez entrer une adresse e-mail valide.";
      }

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

      if (!this.user.first_name) {
        this.errors.first_name = "Veuillez entrer votre prénom.";
      }

      if (!this.user.last_name) {
        this.errors.last_name = "Veuillez entrer votre nom.";
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