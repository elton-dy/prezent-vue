<template>
    <div class="wap-welcome">
        <div class="image-container">
            <video class="wimage" autoplay muted loop>
                <source src="../assets/welcome.webm" type="video/webm">
                Votre navigateur ne supporte pas la balise vidéo HTML5.
            </video>
        </div>
        <div class="button-container flex flex-col items-center justify-center content-center">
            <img src="../assets/logo-prezent.png" class="logo-prezent-welcome">
            <p class="para-container my-2 text-wrap">Bienvenue sur <span class="text-flame-orange">Prézent</span>, la solution IA pour trouver rapidement et facilement des idées de cadeaux adaptées à vos proches et à toutes les occasions. Ne laissez plus le choix d'un cadeau devenir un casse-tête ! </p>
            <div class="flex">
                <div class="flex flex-col items-center mr-4">
                    <router-link to="/login"
                        class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
                        Se connecter
                    </router-link>

                </div>
                <div class="flex flex-col items-center">
                    <button @click.native="goToAboutPage" type="submit"
                        class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
                        Commencer
                    </button>
                </div>
            </div>
            <p class="mt-8 text-royal-purple"> <router-link to="/signup" class="mt-4 text-sm">Créer un compte</router-link></p>

        </div>
  
    </div>
</template>
  
<script>
import { RouterLink } from "vue-router";

export default {
    name: "WelcomePage",
    methods: {
    goToAboutPage() {
      if (localStorage.getItem('visitedAboutPage')) {
        this.$router.push('/home');
      } else {
        localStorage.setItem('visitedAboutPage', true);
        this.$router.push('/about');
      }
    }
  }
};
</script>
  
<style>
  .logo-prezent-welcome{
    width: 457px;
    height: 106px;
    margin-bottom: 50px;
    /* object-fit: cover; */
  }
  .para-container {
    max-width: 457px;
    text-align: center;
    margin-bottom: 50px;
  }
  .wap-welcome{
    display: flex;
  }
  .image-container {
    width: 50%;
    height: 100vh;
  }

  .wimage{
    width: 100%;
    height: 100%;
    object-fit: cover; /* L'image conserve ses proportions et remplit entièrement la div, certains parties de l'image peuvent être coupées */
    object-position: center; /* Positionne l'image au centre de la div */

  }
  .button-container{
    height: 100vh;
    width: 50%;
  }
    /* Styles pour les tablettes (iPad en orientation portrait et paysage) */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
        .image-container {
            width: 40%;
        }
        .button-container{
            width: 60%;
        }
    }

    /* Styles pour les tablettes (iPad en orientation portrait) */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
        .image-container {
            width: 30%;
        }
        .button-container{
            width: 70%;
        }
    }

    /* Styles pour les téléphones */
    @media only screen and (max-width: 767px) {
        .wap-welcome{
            display: flex;
            flex-direction: column;
        }
        .image-container {
            height: 50vh;
            width: 100%;
        }
        .button-container{
            height: 50vh;
            width: 100%;
        }
        .logo-prezent-welcome{
            width: 319px;
            height: 76px;
            margin-bottom: 20px;
            /* object-fit: cover; */
        }
        .para-container {
            max-width: 319px;
            text-align: center;
        }
    }
</style>