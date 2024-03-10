<template>
  <div class="flex">
    <header>
      <SidebarsComponent></SidebarsComponent>
    </header>
    <div class="about">
      <h1 class="max-w-screen-md"> <img src="../assets/baseline.png"></h1>
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

</style>
