import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $global: {
      columns: {
        half: string
      }
    }
  }
}

Vue.prototype.$global = {
  columns: {
    half: 'is-6-widescreen is-7-desktop is-9-tablet is-mobile-12'
  }
}
