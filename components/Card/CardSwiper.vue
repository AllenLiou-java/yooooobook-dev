<template>
  <div>
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="swiper-slide"
        >
          <Card :title="feature.title" :description="feature.description" />
        </div>
      </div>
    </div>

    <!-- If we need navigation buttons -->
    <!-- <div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div> -->

    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.css'
import Card from '@/components/Card/Card.vue'

export default {
  name: 'CardSwiper',
  components: {
    Card,
  },
  props: {
    features: {
      type: Array,
      default() {
        const data = [
          {
            title: '',
            description: '',
          },
        ]
        return data
      },
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const mySwiper = new Swiper('.swiper', {
      initialSlide: 0,
      slidesPerView: 'auto',
      spaceBetween: 24,
      roundLengths: true,
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
      },
      // effect: "coverflow",
      // centeredSlides: true,
      observer: true,
      observeParents: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        bulletElement: 'li',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  overflow: hidden;
  padding-top: 20px;
}

.swiper-slide {
  width: auto;
}

.swiper-button-next {
  position: relative;
  left: calc(100% - 20px);
  top: -220px;
}

.swiper-button-prev {
  position: relative;
  left: -20px;
  top: -200px;
}

.swiper-button-prev,
.swiper-button-next {
  background: #000;
  border-radius: 50%;
  width: 44px;
  height: 44px;

  &::after {
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
  }
}

::v-deep .swiper-pagination {
  position: relative;
  bottom: -10px;
  .swiper-pagination-bullet {
    margin-left: 7px;
    margin-right: 7px;
    background: $secondary;
  }
}

// @include media-w900 {
// 	.swiper {
// 		display: none;
// 	}

// 	.swiper-pagination {
// 		display: none;
// 	}
// }
</style>
