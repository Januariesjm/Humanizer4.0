import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase' // Import Firebase auth instance
import HomePage from '../components/HomePage.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import PremiumFeatures from '../components/PremiumFeatures.vue'
import Profile from '../components/Profile.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/premium', component: PremiumFeatures, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/signin')
  } else {
    next()
  }
})

export default router
