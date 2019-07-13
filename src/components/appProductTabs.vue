<template>
  <div>
    <span
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectedTab = tab"
      :class="{activeTab:selectedTab === tab}"
    >{{ tab }}</span>

    <div v-show="selectedTab === 'Reviews'">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <p>{{ review.name }}</p>
          <p>{{ review.rating }}</p>
          <p>{{ review.review }}</p>
          <p>{{ review.recommend }}</p>
        </li>
      </ul>
    </div>

    <app-product-review v-show="selectedTab === 'Make a Review'" />
  </div>
</template>

<script>
import appProductReview from '@/components/appProductReview'
export default {
  components: {
    appProductReview
  },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>