<template>
  <div class="sideSocialGroup" data-aos="fade-down" data-aos-delay="200">
    <ul class="list-unstyled">
      <li>
        <a href="https://www.facebook.com/yooooobook" target="_blank"
          ><img src="@/assets/img/social/fb-c.svg" alt="facebook-icon"
        /></a>
      </li>
      <li>
        <a href="https://lin.ee/f8oZLym" target="_blank">
          <img src="@/assets/img/social/line-c.svg" alt="line-icon" />
        </a>
      </li>
      <li>
        <a href="mailto:yooooobook@gmail.com" target="_blank">
          <img src="@/assets/img/social/mail-c.svg" alt="mail-icon" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  watch: {
    $route: {
      handler(val) {
        const pathname = val.path
        this.showSocialGroup(pathname)
      },
    },
  },
  mounted() {
    const pathname = location.pathname
    this.showSocialGroup(pathname)
  },
  methods: {
    showSocialGroup(pathname) {
      const sideSocialGroup = document.querySelector('.sideSocialGroup')
      if (pathname === '/' || pathname === '/order') {
        sideSocialGroup.style.display = 'block'
      } else {
        sideSocialGroup.style.display = 'none'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sideSocialGroup {
  // display: none;
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 100;

  @include media-w414 {
    right: 20px;
    bottom: 20px;
  }
  ul {
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
      background-color: #f1f1f1;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 16px;
      width: 52px;
      height: 52px;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: scale(1.2);
      }
      a {
        display: block;
        width: 44px;
        height: 44px;
        img {
          position: relative;

          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
