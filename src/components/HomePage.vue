<template>
  <div>
    <Navbar />
    <div class="container mx-auto p-4">
      <TextHumanizer />
    </div>
  </div>
</template>

<script>
import TextHumanizer from './TextHumanizer.vue'

export default {
  components: {
    TextHumanizer,
  },
}
</script>

<style scoped>
/* Add any local styles here if needed */
</style>
