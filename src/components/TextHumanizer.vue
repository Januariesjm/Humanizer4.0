<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Text Humanizer</h1>
      <textarea
        v-model="inputText"
        placeholder="Enter text to humanize..."
        rows="10"
        class="w-full p-2 border border-gray-300 rounded-md"
      ></textarea>
      <button
        @click="humanizeText"
        class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Humanize
      </button>
      <textarea
        v-if="humanizedText"
        v-model="humanizedText"
        readonly
        rows="10"
        class="mt-4 w-full p-2 border border-gray-300 rounded-md"
      ></textarea>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'TextHumanizer',
    setup() {
      const inputText = ref('')
      const humanizedText = ref('')
      const router = useRouter()
  
      const humanizeText = () => {
        const wordCount = inputText.value.split(/\s+/).length
        if (wordCount > 300) {
          router.push('/premium')
          return
        }
  
        // Simple text humanization algorithm for demonstration
        // Replace this with a more complex algorithm as needed
        humanizedText.value = inputText.value
          .split(' ')
          .map((word, index) => (index % 2 === 0 ? word.toUpperCase() : word.toLowerCase()))
          .join(' ')
      }
  
      return {
        inputText,
        humanizedText,
        humanizeText,
      }
    },
  }
  </script>
  
  <style scoped>
  /* Add any local styles here if needed */
  </style>
  