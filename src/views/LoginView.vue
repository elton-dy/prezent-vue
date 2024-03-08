<template>
  <div class="login">
    <div class="signup flex flex-col items-center">
      <h1 class="mt-2.5 mb-7">Connexion</h1>
      <form @submit.prevent="login" class="form flog px-8">
        <div class="flex flex-wrap -mx-3 mb-6 ">
          <div class="w-full px-3 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
              Email
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.username" type="text" id="username" required placeholder="Adresse electronique">
            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
              Mot de passe
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black" v-model="user.password" type="password" id="password" required placeholder="Mot de passe">
            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>

        <div class="flex flex-col items-center">
          <button type="submit"
          class="flex text-white max-w-40 flex-col gap-y-2 rounded-lg px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
          Se connecter
          </button>
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
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/token/', this.user);
        const token = response.data.access;
        // Stockez le token dans un endroit sécurisé, par exemple dans un httpOnly cookie,
        // ou dans le localStorage si vous acceptez les risques associés.
        localStorage.setItem('token', token);
        this.$router.push('/'); // Redirigez l'utilisateur vers la page d'accueil après une connexion réussie
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
        // Gérez l'erreur de manière appropriée ici, par exemple en affichant un message d'erreur
      }
    }
  }
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