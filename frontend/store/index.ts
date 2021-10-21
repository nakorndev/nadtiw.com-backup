import { Context } from '@nuxt/types'

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

export const actions = {
  async nuxtServerInit ({ commit }, context: Context) {
    try {
      const { data: user } = await context.$axios.get('/auth')
      commit('auth/setData', user)
    } catch (error: any) {
      if (error?.response?.status === 401) {
        context.redirect('/?message=unexpected_error')
      } else {
        commit('auth/deleteData')
      }
    }
  }
}
