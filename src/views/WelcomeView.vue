<template>
    <div class="flex">
        <div class="image-container">
            <img src="../assets/welcome.jpg" alt="" srcset="" class="wimage">
        </div>
        <div class="button-container flex flex-col items-center justify-center content-center">
            <h1>Commencer</h1>
            <div class="flex">
                <div class="flex flex-col items-center">
                    <button type="submit"
                    class="flex text-white max-w-40 flex-col gap-y-2 rounded-lg px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
                    Se connecter
                    </button>
                </div>
                <div class="flex flex-col items-center">
                    <button type="submit"
                    class="flex text-white w-40 flex-col gap-y-2 rounded-lg px-3 py-2 text-left bg-royal-purple/80 transition-colors duration-200 hover:bg-royal-purple focus:outline-none dark:hover:bg-slate-800" >
                    Inviter
                    </button>
                </div>
            </div>

        </div>
  
    </div>
</template>
  
<script>

  export default {

  };
</script>
  
<style>
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
</style>