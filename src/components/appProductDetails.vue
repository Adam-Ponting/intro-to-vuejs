<template>
  <div>
    <ul>
      <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
