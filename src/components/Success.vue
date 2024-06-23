<!-- Success.vue -->
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Payment Successful</h1>
      <p>Your payment was successful! You now have access to premium features.</p>
      <router-link to="/" class="text-blue-600">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Success'
  }
  </script>
  
  <style scoped>
  /* Add any local styles here if needed */
  </style>
  