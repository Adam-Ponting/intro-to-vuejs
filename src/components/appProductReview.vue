<template>
  <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <div v-if="errors.length">
        <p class="error"></p>
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" />
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <!-- .number converts string to number -->
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>
      <label>
        Yes
        <input type="radio" value="Yes" v-model="recommend" />
      </label>
      <label>
        No
        <input type="radio" value="No" v-model="recommend" />
      </label>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js'

export default {
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        /* this.$emit('review-submitted', productReview) // send review-submitted event with productReview as payload to parent */
        EventBus.$emit('review-submitted', productReview) // send review-submitted event with productReview as payload as communicaing to grandparent
        // resets values
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if (!this.name) this.errors.push('Name required.')
        if (!this.review) this.errors.push('Review required.')
        if (!this.rating) this.errors.push('Rating required.')
        if (!this.recommend) this.errors.push('Recommendation required.')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
