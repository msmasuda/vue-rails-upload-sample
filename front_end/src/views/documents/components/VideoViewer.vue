<template>
  <div v-if="path">
    <video controls :src="path" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
  video {
    display: block;
    max-width: 100%;
    margin: 10px auto;
  }
</style>
