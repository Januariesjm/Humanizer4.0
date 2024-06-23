<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto p-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/" class="text-xl font-bold">AI Text Humanizer</router-link>
        
      </div>
      <div class="flex items-center">
        <button v-if="!user" @click="navigateTo('/signin')" class="text-blue-600 mr-4">Sign In</button>
        <button v-if="!user" @click="navigateTo('/signup')" class="text-blue-600 mr-4">Sign Up</button>
        <button v-if="user" @click="navigateTo('/premium')" class="text-blue-600 mr-4">Premium Features</button>
        <div v-if="user" class="relative">
          <button @click="toggleDropdown" class="flex items-center focus:outline-none">
            <img v-if="user.photoURL" :src="user.photoURL" alt="Profile" class="w-8 h-8 rounded-full"/>
            <div v-else class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
              {{ user.email.charAt(0).toUpperCase() }}
            </div>
          </button>
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            <router-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</router-link>
            <button @click="handleSignOut" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const auth = getAuth()
    const user = ref(auth.currentUser)
    const router = useRouter()
    const dropdownOpen = ref(false)

    const navigateTo = (path) => {
      router.push(path)
    }

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const handleSignOut = async () => {
      await signOut(auth)
      user.value = null
      router.push('/signin')
    }

    auth.onAuthStateChanged((currentUser) => {
      user.value = currentUser
    })

    return {
      user,
      navigateTo,
      toggleDropdown,
      handleSignOut,
      dropdownOpen
    }
  }
})
</script>

<style scoped>
/* Add any local styles here if needed */
</style>
