<template>
  <div class="login">
    <div class="signup flex flex-col items-center">
      <div class="w-screen px-8">
        <router-link to="/" class="mt-4 text-xs text-green-800">&lt; retour</router-link>
      </div>
      <h1 class="mt-2.5 mb-7">Connexion</h1>
      <form @submit.prevent="login" class="form flog px-8">
        <div class="flex flex-wrap -mx-3 mb-6 ">
          <div class="w-full px-3 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
              Email
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.email" type="text" id="email"  placeholder="Adresse electronique">
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

        <div class="flex flex-col items-center">
          <button type="submit"
          class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
          Se connecter
          </button>

          <div class="mt-2">
            <router-link to="/password" class="mt-4 text-sm text-rose-800 mr-2">Mot de passe oublié ?</router-link>
            <router-link to="/signup" class="mt-4 text-sm">Créer un compte</router-link>
          </div>
        </div>
        
      </form>
    </div>
    
  </div>
</template>

<script>
import apiClient from "../services/api";


export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      this.resetErrors();

      if (!this.user.email) {
        this.errors.email = "Veuillez entrer une adresse e-mail.";
      }

      if (!this.user.password) {
        this.errors.password = "Veuillez entrer un mot de passe.";
      }

      if (Object.values(this.errors).every(value => value === '')) {
        try {
          const response = await apiClient.post('/token/', this.user);
          const token = response.data.access;
          sessionStorage.setItem('token', token);
          this.$router.push('/home');
        } catch (error) {
          console.error('Une erreur s\'est produite:', error);
          // Gérez l'erreur de manière appropriée ici, par exemple en affichant un message d'erreur
        }
      }
    },
    resetErrors() {
      this.errors = {
        username: '',
        password: '',
      };
    },
  },
};
</script>

<style>
.flog {
  width: 584px;
}
/* Styles pour les tablettes (iPad en orientation portrait et paysage) */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .flog {
    width: 484px;
  }
}

/* Styles pour les tablettes (iPad en orientation portrait) */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .flog {
    width: 400px;
  }
}

/* Styles pour les téléphones */
@media only screen and (max-width: 767px) {
  .flog {
    width: 100%;
  }
}
</style>