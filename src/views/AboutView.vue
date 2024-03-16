<template>
  <div class="flex main-containe-about">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <div class="about-container flex flex-col items-center">
      <div class="flex justify-center mb-4">
        <h1 class="max-w-screen-md"> <img src="../assets/baseline.png"></h1>
      </div>


      <div class="flex flex-col max-w-4xl px-4 pb-2">
        <h2 class="mb-10">Simplifiez vos recherches de cadeaux grâce à notre plateforme d’IA</h2>
        <p class="my-2 text-wrap">
          Bienvenue sur <span class="text-flame-orange">Prézent</span>, la solution IA pour trouver rapidement et facilement des idées de cadeaux adaptées à vos proches et à toutes les occasions.
          Ne laissez plus le choix d'un cadeau devenir un casse-tête !
        </p>
        <p class="my-2 text-wrap">
          <span class="text-flame-orange">Comment ça marche :</span>
          Prézent utilise une technologie d'intelligence artificielle qui permet aux utilisateurs de trouver le cadeau parfait à toute occasion.
          Nous combinons l’apprentissage automatique et le traitement du langage naturel (NLP) pour analyser les conversations des clients et identifier le meilleur cadeau. 
        </p>
        <p class="my-2 text-wrap">
          En analysant les conversations des clients, Prézent peut déterminer les intérêts, le budget et les préférences de l’utilisateur.
          Grâce à ces informations, notre chat peut alors recommander le cadeau parfait au client.  
        </p>
        <p class="my-2 text-wrap">
          Décrivez le plus possible le destinataire du cadeau dans la barre de conversation en bas de page afin que nous vous préparions des idées de cadeaux personnalisées.
        </p>

        <div class="flex flex-col mt-10">
            <router-link to="/home" type="submit"
            class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
            C'est parti !
            </router-link>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import SidebarsComponent from "../components/SidebarsComponent.vue"; 

export default {
    name: "AboutPage",
    components: {SidebarsComponent},
};

</script>
<style>
  .main-containe-about{
    min-height: 100vh;
  }
  .about-container{
    width: 100%;
    overflow-y: auto;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 45px;
    letter-spacing: 0em;
  }
</style>
