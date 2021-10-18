import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $snackbarSuccess (message: string, options?: object): void
    $snackbarError (error: any, options?: object): void
  }
}

const defaultOptions = {
  actionText: 'ปิด'
}

Vue.prototype.$snackbarSuccess = function (message, options = {}) {
  this.$buefy.snackbar.open({
    message,
    ...defaultOptions,
    ...options
  })
}

Vue.prototype.$snackbarError = function (error, options = {}) {
  const message = error?.response?.data?.error ??
    error?.response?.data?.message ??
    error?.message ??
    error ??
    'พบปัญหาบางอย่างไม่คาดคิด'
  this.$buefy.snackbar.open({
    type: 'is-danger',
    message,
    ...defaultOptions,
    ...options
  })
}
