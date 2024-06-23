<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'
import router from './router'

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  }
})
</script>

<style>
/* Add any global styles here if needed */
</style>
