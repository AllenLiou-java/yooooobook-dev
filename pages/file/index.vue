<template>
  <div class="file container">
    <div class="row justify-content-start">
      <div class="col-12 col-md-6 mb-4 mb-md-0">
        <h2 class="text-center mb-4" style="color: #003756">有限公司</h2>
        <b-table
          :fields="fieldsBook"
          :items="book1Links"
          head-variant="dark"
          bordered="bordered"
        >
          <template #cell(title)="data">
            {{ data.item.title }}
          </template>
          <template #cell(link)="data">
            <a
              class="mr-2 hvr-icon-down"
              :href="data.item.link"
              target="_blank"
            >
              <client-only>
                <DownloadBox class="hvr-icon" style="font-size: 28px" />
              </client-only>
            </a>
          </template>
        </b-table>
      </div>
      <div class="col-12 col-md-6 mb-md-0">
        <h2 class="text-center mb-4" style="color: #003756">股份有限公司</h2>
        <b-table
          :fields="fieldsBook"
          :items="book2Links"
          head-variant="dark"
          bordered="bordered"
        >
          <template #cell(title)="data">
            {{ data.item.title }}
          </template>
          <template #cell(link)="data">
            <a
              class="mr-2 hvr-icon-down"
              :href="data.item.link"
              target="_blank"
            >
              <client-only>
                <DownloadBox class="hvr-icon" style="font-size: 28px" />
              </client-only>
            </a>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import fileLinks from '@/assets/js/fileLink'
export default {
  name: 'FilePage',
  data() {
    return {
      img: '',
      isOpen: false,
      book1Links: fileLinks.book1,
      book2Links: fileLinks.book2,
      fieldsBook: [
        {
          key: 'title',
          label: '附件名稱',
          class: ['align-middle', 'text-start'],
        },
        {
          key: 'link',
          label: '下載',
          class: ['align-middle', 'text-center'],
        },
      ],
    }
  },
  head() {
    return {
      title: '檔案下載 - 有良冊股份有限公司',
      meta: [
        {
          name: 'description',
          content: '檔案下載 - 有良冊股份有限公司',
        },
        {
          property: 'og:description',
          content: '檔案下載 - 有良冊股份有限公司',
        },
        {
          property: 'og:title',
          content: '檔案下載 - 有良冊股份有限公司',
        },
        {
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          property: 'og:url',
          content: 'https://www.yooooobook.com/file',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import './file.scss';
.hover-link {
  &:hover {
    font-weight: bold;
    a {
      color: #003756;
    }
  }
}

.title-shadow {
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
</style>
