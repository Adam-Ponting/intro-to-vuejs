<template>
  <div id="app">
    <HelloWorld />
    <!-- listens for add-to-cart method -->
    <app-product
      :premium="premium"
      @add-to-cart="updateCart"
      @remove-from-cart="removeFromCart"
    />
    <div class="cart">
      <p>Cart {{ cart }}</p>
      <p>Cart {{ cart.length }}</p>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import appProduct from '@/components/appProduct.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    appProduct
  },
  data() {
    return {
      premium: true,
      cart: []
    }
  },
  methods: {
    updateCart(id) {
      // receive variantId
      this.cart.push(id)
      //this.variants[this.selectedVariant].variantQuantity -= 1
    },
    removeFromCart(id) {
      // removes all items that match id from cart array
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1) // at index position i, remove 1 item
        }
      }
    }
  }
}
</script>

<style lang="scss">
// @import 'src/assets/style.scss'; **import to this component only**
</style>
