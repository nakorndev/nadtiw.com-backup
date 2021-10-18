export default {
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    './assets/sass/main.sass'
  ],

  plugins: [
    './plugins/fontawesome.client.ts',
    './plugins/snackbar.client.ts'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build'
  ],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultIconComponent: 'FontAwesomeIcon',
    defaultSnackbarDuration: 5000,
    defaultSnackbarPosition: 'is-top',
    defaultNoticeQueue: false,
    defaultDialogConfirmText: 'ตกลง',
    defaultDialogCancelText: 'ยกเลิก',
    defaultLocale: 'th-TH',
    defaultTimeFormatter: 'HH:mm',
    defaultTimeParser: 'HH:mm',
    defaultModalCanCancel: ['escape', 'outside', 'button']
  },

  proxy: {
    '/api/': {
      target: process.env.BACKEND_URL ?? 'http://localhost:3001',
      pathRewrite: { '^/api/': '' }
    }
  },

  axios: {
    baseURL: '/api/'
  },

  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active'
  },

  build: {
  }
}
