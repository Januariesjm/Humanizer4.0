<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Sign Up with Email</h1>
    <form @submit.prevent="signUp" class="max-w-md mx-auto">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <input v-model="email" type="email" id="email" name="email" autocomplete="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="password" type="password" id="password" name="password" autocomplete="new-password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Sign Up</button>
    </form>

    <button @click="signInWithGoogle" class="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Sign Up with Google</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth' // Import necessary functions from firebase/auth

export default defineComponent({
  name: 'SignUp',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const auth = getAuth() // Initialize Firebase auth instance

    const signUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        console.log('User signed up:', user)
        // Redirect to sign in page after successful sign up
        router.push('/signin')
      } catch (error) {
        console.error('Error signing up:', error.message)
        // Handle error, show message to user, etc.
      }
    }

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User signed in with Google:', user);
        // Redirect to home page or another route after successful sign in
        // router.push('/')
      } catch (error) {
        console.error('Error signing in with Google:', error.message);
        // Handle error, show message to user, etc.
      }
    }

    return {
      email,
      password,
      signUp,
      signInWithGoogle
    }
  }
})
</script>

<style scoped>
/* Add any local styles here if needed */
</style>
