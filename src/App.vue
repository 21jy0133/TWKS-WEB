<template>
  <v-app>
    <v-app-bar app>
   TWKSシステム
    </v-app-bar>

    <v-main>

     <router-view></router-view>

    </v-main>

    <v-footer app>
      12345678
  </v-footer>

  </v-app>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from 'vue'


export default {

  
setup() {
   const route=useRoute();

   const path = computed(() =>route.path)
   console.log(path)
}}
</script>

<style scoped>

</style>
