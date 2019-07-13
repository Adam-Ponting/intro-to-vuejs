<template>
  <div>
    <ul>
      <li v-for="size in sizes" :key="size">{{ size }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>