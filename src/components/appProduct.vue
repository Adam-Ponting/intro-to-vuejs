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
      <p>Shipping: {{ shipping }}</p>
      <p>User is premium: {{ premium }}</p>

      <!-- prop examples, data passed down -->
      <app-product-details :details="details" />
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
    <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length"> There are no reviews yet.</p>
      <ul>
        <li v-for="(review,index) in reviews" :key="index">
          <p>{{ review.name }}</p>
          <p>{{ review.rating }}</p>
          <p>{{ review.review }}</p>
          <p>{{ review.recommend }}</p>
        </li>
      </ul>
    </div>

    <app-product-review @review-submitted="addReview" />
  </div>
</template>

<script>
import appProductDetails from '@/components/appProductDetails.vue'
import appProductSizes from '@/components/appProductSizes.vue'
import appProductReview from '@/components/appProductReview.vue'
export default {
  components: {
    appProductDetails,
    appProductSizes,
    appProductReview
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
      reviews: []
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
    },
    addReview(productReview) {
      this.reviews.push(productReview)
    }
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
  }
}
</script>


<style lang="scss" scoped>
</style>