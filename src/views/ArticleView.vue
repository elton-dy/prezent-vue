<template>
  <div class="flex main-containe-about">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <div class="article-container flex flex-col items-center">
      <div class="flex justify-center mb-4 mt-8">
        <h1 class="max-w-4xl">{{ article.title }}</h1>
      </div>
      <div class="flex flex-col max-w-4xl px-4 pb-2">
        <h2 class="mb-10">{{ article.subtitle }}</h2>
        <div v-html="article.content"></div>
        <p class="my-2 text-wrap">Auteur : {{ article.author }}</p>
      </div>
      <div class="flex flex-col mt-10">
          <router-link to="/articles" type="submit"
          class="flex items-center justify-center text-white w-40 flex-col gap-y-2 rounded-full px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
          Retour
          </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import SidebarsComponent from "../components/SidebarsComponent.vue";
import apiClient from "../services/api"; 

export default {
    name: "Article",
    components: {SidebarsComponent},
    data() {
      return {
        article: {},
      };
    },
    created() {
      this.fetchArticle();
    },
    methods: {
      async fetchArticle() {
        try {
          const response = await apiClient.get(`/articles/${this.$route.params.id}/`);
          this.article = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
};

</script>
<style>
  .main-containe-about{
    min-height: 100vh;
  }
  .article-container{
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
