<template>
  <div>
    <div class="card">
      <div class="circle">
        <h3>{{ title }}</h3>
      </div>
      <p>{{ description }}</p>
      <div class="selection_line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import './card.scss';
</style>
