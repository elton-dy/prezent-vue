<template>
  <div class="flex main-containe-about">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <div class="articles-container flex flex-col items-center">
      <div class="flex justify-center mb-4">
        <h1 class="max-w-screen-md"> Actualité</h1>
      </div>

      <div class="articles-wrap flex flex-wrap overflow-y-scroll">
        <article class="mx-auto mb-4 text-balance w-[310px] h-[520px]" v-for="article in articles" :key="article.id">
          <img class="w-[310px] h-[250px] object-cover" src="https://img.freepik.com/photos-gratuite/concept-transformation-numerique-fond-puce-technologie-ia_53876-124669.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1710288000&semt=sph" >
          <div class="flex flex-col h-[270px] justify-evenly">
            <h2 class="tilte-article">{{ article.title }}</h2>
            <!-- <p>{{ article.subtitle }}</p> -->
            <p>{{ getTruncatedText(article.content,300) }}</p>
            <p>Auteur : {{ article.author }}</p>
          </div>
        </article>
        <article class="mx-auto mb-4 text-balance w-[310px] h-[520px]" v-for="article in articles" :key="article.id">
          <img class="w-[310px] h-[250px] object-cover" src="https://img.freepik.com/photos-gratuite/concept-transformation-numerique-fond-puce-technologie-ia_53876-124669.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1710288000&semt=sph" >
          <div class="flex flex-col h-[270px] justify-evenly">
            <h2 class="tilte-article">{{ article.title }}</h2>
            <!-- <p>{{ article.subtitle }}</p> -->
            <p>{{ getTruncatedText(article.content,300) }}</p>
            <p>Auteur : {{ article.author }}</p>
          </div>
        </article>
        <article class="mx-auto mb-4 text-balance w-[310px] h-[520px]" v-for="article in articles" :key="article.id">
          <img class="w-[310px] h-[250px] object-cover" src="https://img.freepik.com/photos-gratuite/concept-transformation-numerique-fond-puce-technologie-ia_53876-124669.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1710288000&semt=sph" >
          <div class="flex flex-col h-[270px] justify-evenly">
            <h2 class="tilte-article">{{ article.title }}</h2>
            <!-- <p>{{ article.subtitle }}</p> -->
            <p>{{ getTruncatedText(article.content,300) }}</p>
            <p>Auteur : {{ article.author }}</p>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<script>
import SidebarsComponent from "../components/SidebarsComponent.vue";
import apiClient from "../services/api";

export default {
  name: "ArticlesPage",
  components: { SidebarsComponent },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await apiClient.get("/articles/");
        this.articles = response.data;
        console.log('ici')
      } catch (error) {
        console.error(error);
      }
    },
    getTruncatedText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }
      const truncatedText = text.substring(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      const truncatedTextWithEllipsis = lastSpaceIndex !== -1
        ? truncatedText.substring(0, lastSpaceIndex) + '...'
        : truncatedText + '...';
      return truncatedTextWithEllipsis;
    }
  },
};
</script>

<style>
.articles-container{
  width: 100%;
}

.articles-wrap{
  width: -webkit-fill-available;
  padding: 0 4px;
  max-height: 90vh;
  max-width: 1250px;
}

.tilte-article{
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>