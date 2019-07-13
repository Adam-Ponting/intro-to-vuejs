<template>
  <div class="product">
    <div class="product-image">
      <img :src="image" alt="Picture of socks" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">in stock</p>
      <p v-else>out of stock</p>
      <p>{{ sale }}</p>
      <span
        class="tab"
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
      >{{ tab }}</span>
      <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>
      <p>User is premium: {{ premium }}</p>

      <!-- prop examples, data passed down -->
      <app-product-details :details="details" v-show="selectedTab === 'Details'" />
      <app-product-sizes :sizes="sizes" />

      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)"
      ></div>

      <p>{{ description }}</p>
      <a :href="link" target="_blank">More products like this</a>

      <!-- 
          class binding :class="{ nameOfClass: truthyValue }" 
      -->
      <button
        @click="addToCart"
        :disabled="!variants[selectedVariant].variantQuantity"
        :class="{ disabledButton: !variants[selectedVariant].variantQuantity }"
      >Add to Cart {{ variants[selectedVariant].variantQuantity }}</button>

      <!-- 
          object class binding :class="classObject"
          classObject: {
            className1: true/false,
            className2: true/false
          }
      -->
      <!--       <button @click="removeFromCart" :disabled="!cart" :class="classObject">Remove from cart</button>
      -->
      <button @click="removeFromCart">Remove from cart</button>
    </div>

    <app-product-tabs :reviews="reviews" />
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import appProductDetails from '@/components/appProductDetails.vue'
import appProductSizes from '@/components/appProductSizes.vue'
import appProductTabs from '@/components/appProductTabs.vue'

export default {
  components: {
    appProductDetails,
    appProductSizes,
    appProductTabs
  },
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      description: 'A pair of warm fuzzy socks',
      selectedVariant: 0, // sets image
      link:
        'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      details: ['80% cotton', '20% polyester', 'Unisex'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: require('@/assets/green-socks.jpg'),
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: require('@/assets/blue-socks.jpg'),
          variantQuantity: 4
        }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      reviews: [],
      tabs: ['Details', 'Shipping'],
      selectedTab: 'Details'
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId) // emit event, with payload
    },
    removeFromCart() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId
      ) // emit event, with payload
    },
    updateProduct(index) {
      this.selectedVariant = index // set to 0 or 1
    }
    /*     addReview(productReview) {
      this.reviews.push(productReview)
    }
 */
  },
  computed: {
    /*     classObject() {
      return {
        outOfStock: !this.cart, // apply .outOfStock class if cart is falsy
        disabledButton: !this.cart // apply .disabledButton class if cart is falsy
      }
    },
 */ title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage // takes the index from variants array to set image
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!'
      }
      return this.brand + ' ' + this.product + ' are not on sale'
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      } else {
        return '£2.99'
      }
    }
  },
  mounted() {
    EventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
}
</script>

<style lang="scss" scoped></style>
