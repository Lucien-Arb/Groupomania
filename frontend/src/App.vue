<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>

</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import { mapActions } from 'vuex';


export default {

  components: {
    TheHeader,
    },
    methods: {
      ...mapActions('auth', ['fetchAccessUser']),
    },
    created() {
      if (localStorage.getItem('user') !== "") {
        return this.fetchAccessUser();
      }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html, body {
  font-family: "Roboto", sans-serif;
    margin: 0;
    height:100%;
    width:100%;
    padding:0;
}

#app, body {
  background-color: #f3f1f1;
}

h1 {
  font-size: 1.7rem;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.6s ease-out;
}

.route-leave-active {
    transition: all 0.6s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>