require('dotenv').config()
const {
  FIREBASE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  GOOGLE_API_URL,
  API_URL,
  WEB_URL,
  GMAIL_APP_PASSWORD,
  GOOGLE_ANALYTICS_ID,
  FIREBASE_AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '有良冊股份有限公司',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'keywords',
        content:
          '有良冊,公司登記,公司申請,公司登記實務及案例解析,有限公司,股份有限公司,應備文件詳析,company registration',
      },
      {
        property: 'og:site_name',
        content: '有良冊股份有限公司',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      { property: 'og:locale', content: 'zh_TW' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/apple-icon-57x57.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/apple-icon-60x60.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/apple-icon-72x72.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/apple-icon-76x76.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/apple-icon-114x114.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/apple-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/apple-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-icon-180x180.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-icon-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/api-plugin.js' },
    { src: '~/plugins/aos.js', mode: 'client' },
    { src: '~/plugins/flipbook.js', mode: 'client' },
    { src: '~/plugins/icon.js', mode: 'client' },
    { src: '~/plugins/bootstrapVue.js', mode: 'client' },
    { src: '~/plugins/firebase', mode: 'client' },
    { src: '~/plugins/jsonExcel', mode: 'client' },
    { src: '~/plugins/qs.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['@/assets/scss/abstracts/__abstracts-dir.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    '@nuxtjs/google-gtag',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    componentPlugins: [
      'LayoutPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'ToastPlugin',
      'ModalPlugin',
      'BreadcrumbPlugin',
      'CollapsePlugin',
      'CardPlugin',
    ],
    directivePlugins: ['VBPopoverPlugin', 'VBScrollspyPlugin'],
    components: [
      'BContainer',
      'BRow',
      'BCol',
      'BFormInput',
      'BFormTextarea',
      'BButton',
      'BTable',
      'BModal',
      'BFormGroup',
      'BFormSelect',
      'BInputGroup',
      'BInputGroupAppend',
      'BPagination',
      'BCard',
      'BFormFile',
      'BBadge',
      'BProgress',
      'BProgressBar',
    ],
    directives: ['VBModal', 'VBPopover', 'VBScrollspy'],
    icons: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    babel: {
      compact: false,
    },
    optimization: {
      runtimeChunk: 'single',

      splitChunks: {
        chunks: 'all',

        maxInitialRequests: Infinity,

        minSize: 0,

        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,

            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js

              // or node_modules/packageName

              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]

              // npm package names are URL-safe, but some servers don't like @ symbols

              return `npm.${packageName.replace('@', '')}`
            },
          },
        },
      },
    },
  },
  serverMiddleware: [
    { path: '/auth', handler: '~/server/auth.js' },
    { path: '/mail', handler: '~/server/mail.js' },
  ],
  env: {
    FIREBASE_API_KEY,
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID,
    GOOGLE_API_URL,
    API_URL,
    WEB_URL,
    GMAIL_APP_PASSWORD,
    GOOGLE_ANALYTICS_ID,
    FIREBASE_AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
  },
  loading: '~/components/LoadingBar.vue',
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'admin-search-detail',
        path: '/admin/search/detail/:uid/:orderId',
        component: resolve(__dirname, 'pages/admin/search/detail/_orderId'),
      })
    },
  },

  // 開始加入GA code
  'google-gtag': {
    id: process.env.GOOGLE_ANALYTICS_ID, // 必填，請填寫剛申請到的追蹤碼ID
    config: {
      // 這裡是填寫對gtag的需求選項
      anonymize_ip: true,
      send_page_view: false, // 避免頁面刷新時後的重複追蹤
      linker: {
        // 跨域追蹤，追蹤兩個相關但不同網域的頁面
        domains: ['yooooobook.com'],
      },
    },
    debug: true, // 允許在開發中進行追蹤
    disableAutoPageTrack: false, // 關閉追蹤每個頁面路由
  },
}
