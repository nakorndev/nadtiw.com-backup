export const state = () => ({
  loading: false
})

export const mutations = {
  showLoading (state) {
    state.loading = true
  },
  hideLoading (state) {
    state.loading = false
  }
}
