<template>
  <div class="wrapper">
    <v-header></v-header> 
    <v-menu></v-menu> 
    <div class="content">
      <router-view></router-view>
    </div>   
  </div>
</template>

<script>
import vMenu from './menu.vue';
import vHeader from './Header.vue';
export default {
  components:{
        vMenu,vHeader
  }
}
</script>
