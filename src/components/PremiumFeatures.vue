<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Premium Features</h1>
    <p class="mb-4">Unlock unlimited text humanization for only $10 per year.</p>
    <button @click="handleStripeCheckout" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4">
      Pay with Credit Card
    </button>
    <div id="paypal-button-container"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

export default defineComponent({
  name: 'PremiumFeatures',
  setup() {
    const stripePromise = loadStripe('pk_test_51NlX4pJkn9MgwNLISclssTrbtZuSd3UpmtLdIOOGqgeDhMrPLANnGa4LDObNkChNMp5P39xfFbuk1UrDxVJAAuws006jDuBJDL') // Replace with your Stripe publishable key

    const handleStripeCheckout = async () => {
      const stripe = await stripePromise

      const { data: sessionId } = await axios.post('http://localhost:3001/create-checkout-session', {
        priceId: 'price_1IshyeGx9F3X8uQtDix5IVQF' // Replace with your Stripe price ID
      })

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        console.error('Stripe checkout error:', error)
      }
    }

    const loadPayPalButton = () => {
      window.paypal.Buttons({
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            'plan_id': 'P-3RX065706M3469222L5IFM4I' // Replace with your PayPal plan ID
          });
        },
        onApprove: function(data, actions) {
          alert('Subscription completed!');
        },
        onError: function(err) {
          console.error('PayPal error:', err);
        }
      }).render('#paypal-button-container');
    }

    return {
      handleStripeCheckout,
      loadPayPalButton
    }
  },
  mounted() {
    this.loadPayPalButton()
  }
})
</script>

<style scoped>
/* Add any local styles here if needed */
</style>
