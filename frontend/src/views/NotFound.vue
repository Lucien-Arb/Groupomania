<template>
  <div class="background">
      <section class="section columns is-centered is-mobile">
        <div class=" card
            column
            is-10-desktop
            is-10-tablet
            is-10-mobile
            is-half-widescreen
            p-6 has-text-centered">
            <h2 class="title is-3 is-mobile-is-4 has-text-link ">Oups !... Mauvaise url, veuillez revenir à la page de connexion.</h2>
           <div class="buttons ">
                <router-link
                    to="/auth"
                    class="button is-success title is-6 is-fullwidth"
                    >Page de connexion</router-link
                >
        </div>
        </div>
      </section>
  </div>
</template>

<script>

export default {
 
}
</script>

<style scoped>
.background {
  background: url(../assets/paris2.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: block;
  height: 100vh;
  padding: 60px;
  padding-left: 120px;
  box-sizing: border-box;
}
</style>