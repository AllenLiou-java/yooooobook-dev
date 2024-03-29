<template>
  <div class="bg-secondary">
    <div class="container">
      <div class="left">
        <a
          style="font-size: 20px; margin-bottom: 25px; display: inline-block"
          href="https://www.yooooobook.com/"
          >有良冊股份有限公司</a
        >
        <ul class="social-icons list-unstyled">
          <li>
            <a href="https://www.facebook.com/yooooobook" target="_blank">
              <img src="@/assets/img/social/fb-b.svg" alt="fb-icon" />
            </a>
          </li>
          <li>
            <a href="https://lin.ee/f8oZLym" target="_blank">
              <img src="@/assets/img/social/line-b.svg" alt="line-icon" />
            </a>
          </li>
          <li>
            <a href="mailto:yooooobook@gmail.com" target="_blank">
              <img src="@/assets/img/social/mail-b.svg" alt="mail-icon" />
            </a>
          </li>
        </ul>
        <ul class="infos list-unstyled">
          <li>統一編號：94008568</li>
          <li>
            <span>Line ID：</span>
            <a href="https://lin.ee/f8oZLym" target="_blank">@yooooobook</a>
          </li>
          <li>
            <span>Email：</span>
            <a href="mailto:yooooobook@gmail.com" target="_blank"
              >yooooobook@gmail.com</a
            >
          </li>
        </ul>
      </div>
      <div class="right">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyooooobook&tabs=events&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1418137311921727"
          width="340"
          height="130"
          style="border: none; overflow: hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
        <div class="copyright">
          Copyright © 2023 Yooooobook All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '公司登記實務及案例解析/公司登記書籍｜有良冊',
    }
  },
}
</script>

<style lang="scss" scoped>
li,
a {
  color: #fff;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 60px;
  padding-bottom: 50px;
}

.left {
  width: 280px;
  a {
    transition: 0.3s;
    &:hover {
      color: #a89262;
    }
  }
  ul.social-icons {
    display: flex;
    li {
      background-color: #bfc0c0;
      border-radius: 50px;
      margin-left: 4px;
      margin-right: 4px;
      transition: 0.3s;
      &:hover {
        background-color: #ffffff;
      }
      a {
        display: block;
        img {
          width: 42px;
          height: 42px;
          padding: 8px;
        }
      }
    }
  }
  ul.infos {
    li {
      margin-bottom: 6px;
    }
  }
}
.right {
  width: calc(100% - 280px);
  text-align: right;
  .copyright {
    display: flex;
    align-items: center;
    margin-top: 30px;
    color: #9a9a9a;

    &::before {
      flex-grow: 1;
      content: '';
      height: 1px;
      display: inline-block;
      background-color: #9d9d9d;
      margin-right: 20px;
    }
  }
}

@include media-w768 {
  .container {
    flex-direction: column;
    align-items: start;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .right {
    width: 100%;
    text-align: left;

    .copyright {
      display: block;
      padding-top: 15px;
      border-top: 1px solid #9d9d9d;
      &::before {
        display: none;
      }
    }
  }
}

@include media-w414 {
  .right {
    margin-top: 16px;
    .copyright {
      font-size: 12px;
    }
  }
}
</style>
