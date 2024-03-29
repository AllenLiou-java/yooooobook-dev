<template>
  <div class="banner_content">
    <div class="container d-flex justify-content-center align-items-center">
      <div class="text_intro">
        <p class="book_slogan" data-aos="fade-up" data-aos-delay="800">
          一本在手，登記不愁!!!
        </p>
        <h2 class="book_name" data-aos="fade-down" data-aos-delay="200">
          公司登記實務<br />及案例解析<span>(共三冊)</span>
        </h2>
        <p class="book_name_en" data-aos="fade-down" data-aos-delay="400">
          Company Registration Case
        </p>
        <div
          class="underline"
          data-aos="zoom-in-right"
          data-aos-delay="600"
          data-aos-duration="1600"
        ></div>
        <ul class="book_subname list-unstyled">
          <li data-aos="fade-right" data-aos-delay="1000">
            有限公司篇<span class="text-secondary">【532頁】</span>
          </li>
          <li data-aos="fade-right" data-aos-delay="1200">
            股份有限公司篇<span class="text-secondary">【964頁】</span>
          </li>
          <li data-aos="fade-right" data-aos-delay="1400">
            應備文件詳析篇<span class="text-secondary">【296頁】</span>
          </li>
        </ul>

        <div
          class="book_photo mobile"
          data-aos="fade-down"
          data-aos-delay="600"
        ></div>

        <!-- <div
          class="recommand-box position-relative overflow-hidden py-3 pl-4"
          style="background-color: #fff; padding-right: 32px"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <ul class="recommend mb-0 list-unstyled">
            <li class="mb-2">
              <u
                >台中市會計師公會
                <span class="font-weight-bold">黃志堅</span> 理事長</u
              >
            </li>
            <li class="mb-2">
              <u
                >記帳士公會全國聯合會
                <span class="font-weight-bold">嚴秀琴</span> 理事長</u
              >
            </li>
            <li class="mb-0">
              <u
                >記帳及報稅代理人公會全國聯合會
                <span class="font-weight-bold">洪明賢</span> 理事長</u
              >
            </li>
          </ul>
        </div> -->

        <div class="features">
          <div class="circle" data-aos="flip-left" data-aos-delay="600">
            <p>文件<br />完備</p>
          </div>
          <div class="circle" data-aos="flip-left" data-aos-delay="700">
            <p>用詞<br />精準</p>
          </div>
          <div class="circle" data-aos="flip-left" data-aos-delay="800">
            <p>於法<br />有據</p>
          </div>
          <div class="circle" data-aos="flip-left" data-aos-delay="900">
            <p>範例<br />詳盡</p>
          </div>
          <div class="circle" data-aos="flip-left" data-aos-delay="1000">
            <p>由簡<br />入繁</p>
          </div>
        </div>
      </div>
      <div class="book_photo" data-aos="fade-left" data-aos-delay="600"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import './bannerContent.scss';

.recommand-box {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.recommend:before {
  content: '推薦';
  position: absolute;
  top: -8px;
  right: -26px;
  z-index: 1;
  padding: 14px 22px 2px;
  background-color: #ff9900;
  transform: rotate(45deg);
  font-size: 12px;
  color: #ffffff;
}
</style>
