<template>
  <v-app>
    <v-app-bar app>
   TWKSシステム
    </v-app-bar>

    <v-main>
    <router-view />
    </v-main>

    <v-footer app>
      KH株式会社
  </v-footer>

  </v-app>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from 'vue'
import path from 'path'



export default {
  


setup() {
   const route=useRoute();

   const path = computed(() =>route.path)
   const name = computed(() =>route.name)
   console.log(path)
   console.log(name)
   console.log(route)
}}
</script>

<style scoped>

</style>
