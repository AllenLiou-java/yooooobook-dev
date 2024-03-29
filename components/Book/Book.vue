<template>
  <transition name="zoom">
    <div
      v-if="isOpen"
      id="book"
      :class="{ 'has-mouse': hasMouse }"
      :style="{ top: bookOffsetTop + 'px' }"
      @touchstart="hasMouse = false"
    >
      <Flipbook
        v-slot="flipbook"
        ref="flipbook"
        class="flipbook"
        :pages="pagesContent.pages"
        :start-page="pageNum"
        :zooms="[1, 2]"
        @flip-left-end="onFlipLeftEnd"
        @flip-right-end="onFlipRightEnd"
      >
        <client-only>
          <div class="action-bar">
            <left-icon
              class="btn"
              :class="{ disabled: !flipbook.canFlipLeft }"
              @click="flipbook.flipLeft"
            />
            <plus-icon
              class="btn"
              :class="{ disabled: !flipbook.canZoomIn }"
              @click="flipbook.zoomIn"
            />
            <span class="page-num">
              Page {{ flipbook.page }} of {{ flipbook.numPages }}
            </span>
            <minus-icon
              class="btn"
              :class="{ disabled: !flipbook.canZoomOut }"
              @click="flipbook.zoomOut"
            />
            <right-icon
              class="btn"
              :class="{ disabled: !flipbook.canFlipRight }"
              @click="flipbook.flipRight"
            />
            <close-icon class="btn close" @click="closeViewer" />
          </div>
        </client-only>
      </Flipbook>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
    },
    pagesContent: {
      type: Object,
      default() {
        return {
          name: '',
          activePage: 1,
          coverImg: '',
          pages: [],
        }
      },
    },
    bookOffsetTop: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      hasMouse: true,
      pageNum: this.pagesContent.activePage,
    }
  },
  watch: {
    isOpen(newVal, oldVal) {
      if (newVal) {
        window.location.hash = `${this.pagesContent.name}/`
        this.pageNum = this.pagesContent.activePage
      } else {
        window.location.hash = ''
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', (ev) => {
      const flipbook = this.$refs.flipbook
      if (!flipbook) return
      // eslint-disable-next-line eqeqeq
      if (ev.keyCode == 37 && flipbook.canFlipLeft) flipbook.flipLeft()
      // eslint-disable-next-line eqeqeq
      if (ev.keyCode == 39 && flipbook.canFlipRight) flipbook.flipRight()
    })

    window.addEventListener('hashchange', this.setPageFromHash)
    this.setPageFromHash()
  },
  methods: {
    onFlipLeftEnd(page) {
      window.location.hash = `${this.pagesContent.name}/` + page
    },
    onFlipRightEnd(page) {
      window.location.hash = `${this.pagesContent.name}/` + page
    },
    setPageFromHash() {
      const n = parseInt(window.location.hash.split('/')[2], 10)
      if (isFinite(n)) this.pageNum = n
    },
    closeViewer() {
      window.location.hash = ''
      this.$emit('closeViewer', !this.isOpen)
    },
  },
}
</script>

<style lang="scss">
@import './book.scss';
</style>
