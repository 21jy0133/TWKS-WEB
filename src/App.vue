<template>
  <v-app>
    
    <AppBar></AppBar>

    <v-main>
      <router-view />
    </v-main>


    <vue-element-loading :active="$loading.active" is-full-screen />

    <v-footer app>
      KH株式会社 {{ $loading }}
    </v-footer>

  </v-app>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AppBar from './components/AppBar.vue';

export default {

  components: {
    AppBar
  },

  setup() {
    const route = useRoute();

    const path = computed(() => route.path)
    const name = computed(() => route.name)
    console.log(path)
    console.log(name)
    console.log(route)
  }
}
</script>

<style scoped></style>
