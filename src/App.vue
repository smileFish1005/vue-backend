<template>
  <div id="app">
    <div class="wrapper">
      <v-header></v-header> 
      <v-menu></v-menu> 
      <div class="content">
        <router-view></router-view>
      </div>   
    </div>
  </div>
</template>

<script>
import vMenu from './components/menu.vue';
import vHeader from './components/Header.vue';
export default {
  name: 'app',
  components:{
        vMenu,vHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@import "../static/css/main.css";
@import "../static/css/theme-green/color-green.css";   
</style>
