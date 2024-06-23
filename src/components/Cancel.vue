<!-- Cancel.vue -->
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Payment Cancelled</h1>
      <p>Your payment was cancelled. If this was a mistake, please try again.</p>
      <router-link to="/" class="text-blue-600">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cancel'
  }
  </script>
  
  <style scoped>
  /* Add any local styles here if needed */
  </style>
  