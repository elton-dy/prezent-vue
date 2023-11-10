<template>
  <div class="login">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Email:</label>
        <input v-model="user.username" type="text" id="username" required>
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input v-model="user.password" type="password" id="password" required>
      </div>
      <button type="submit">Se connecter</button>
    </form>
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
