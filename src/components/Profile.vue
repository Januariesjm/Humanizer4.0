// src/components/Profile.vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div class="max-w-md mx-auto">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Profile Image</label>
        <div class="mt-1 flex items-center">
          <img v-if="profileImage" :src="profileImage" alt="Profile" class="w-16 h-16 rounded-full"/>
          <div v-else class="w-16 h-16 bg-gray-500 text-white flex items-center justify-center rounded-full">
            {{ user.email.charAt(0).toUpperCase() }}
          </div>
          <input type="file" @change="handleImageUpload" class="ml-4" />
        </div>
      </div>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="name" type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" disabled class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
        <input v-model="password" type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="plan" class="block text-sm font-medium text-gray-700">Plan</label>
        <input v-model="plan" type="text" id="plan" disabled class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100" />
      </div>
      <button @click="updateProfile" class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Update Profile</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { getAuth, updateProfile, updatePassword, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export default defineComponent({
  name: 'Profile',
  setup() {
    const auth = getAuth()
    const storage = getStorage()
    const user = ref(null)
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const plan = ref('Free')
    const profileImage = ref(null)

    const handleImageUpload = async (event) => {
      const file = event.target.files[0]
      if (file) {
        const storageReference = storageRef(storage, `profileImages/${auth.currentUser.uid}`)
        await uploadBytes(storageReference, file)
        const downloadURL = await getDownloadURL(storageReference)
        profileImage.value = downloadURL
      }
    }

    const updateProfile = async () => {
      try {
        if (name.value) {
          await updateProfile(auth.currentUser, { displayName: name.value, photoURL: profileImage.value })
        }
        if (password.value) {
          await updatePassword(auth.currentUser, password.value)
        }
        alert('Profile updated successfully')
      } catch (error) {
        console.error('Error updating profile:', error.message)
      }
    }

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          user.value = currentUser
          name.value = currentUser.displayName || ''
          email.value = currentUser.email
          profileImage.value = currentUser.photoURL || ''
          // Check if the user is on a premium plan and update the plan variable accordingly
          // For example, if you have a custom claim or some other way to determine this:
          // plan.value = currentUser.customClaims?.premium ? 'Premium' : 'Free'
        }
      })
    })

    return {
      name,
      email,
      password,
      plan,
      profileImage,
      handleImageUpload,
      updateProfile,
      user
    }
  }
})
</script>

<style scoped>
/* Add any local styles here if needed */
</style>
