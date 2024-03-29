<template>
  <div>
    <b-toast id="my-toast" :toaster="toaster" :variant="variant" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">{{ title }}</strong>
        </div>
      </template>
      {{ content }}
    </b-toast>
  </div>
</template>

<script>
import { BImg } from 'bootstrap-vue'
export default {
  components: {
    BImg,
  },
  props: {
    title: {
      type: String,
      default: 'Notice!',
    },
    content: {
      type: String,
      default: 'This is the content of the toast.',
    },
    variant: {
      type: String,
      default: 'danger',
    },
    toaster: {
      type: String,
      default: 'b-toaster-bottom-right',
    },
  },
  data() {
    return {}
  },
}
</script>
