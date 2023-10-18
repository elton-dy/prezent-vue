<template>
  <div class="signup">
    <h2>Inscription</h2>

    <form @submit.prevent="register">
      <div>
        <label for="first_name">Prénom:</label>
        <input v-model="user.first_name" type="text" id="first_name" required>
      </div>

      <div>
        <label for="last_name">Nom:</label>
        <input v-model="user.last_name" type="text" id="last_name" required>
      </div>

      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input v-model="user.username" type="text" id="username" required>
      </div>

      <div>
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" id="email" required>
      </div>

      <div>
        <label for="password">Mot de passe:</label>
        <input v-model="user.password" type="password" id="password" required>
      </div>

      <div>
        <label for="confirmPassword">Confirmer le mot de passe:</label>
        <input type="password" v-model="user.confirmPassword" id="confirmPassword" required>
      </div>

      <button type="submit" >S'inscrire</button>

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
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Les mots de passe ne correspondent pas!";
        return;
      }
      try {
        const response = await apiClient.post('/users/', this.user);
        console.log("Utilisateur enregistré avec succès!", response.data);
      } catch (error) {
        console.error("Il y a eu une erreur lors de l'enregistrement:", error);
      }
    }
  }
};
</script>