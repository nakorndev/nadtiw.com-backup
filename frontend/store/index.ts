import { Context } from '@nuxt/types'

export const state = () => ({
  loading: false,
  auth: null
})

export const mutations = {
  showLoading (state) {
    state.loading = true
  },
  hideLoading (state) {
    state.loading = false
  },
  setAuth (state, data) {
    state.auth = data
  },
  deleteAuth (state) {
    state.auth = null
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, context: Context) {
    try {
      const { data: user } = await context.$axios.get('/auth')
      commit('setAuth', user)
    } catch (error: any) {
      if (error?.response?.status === 401) {
        commit('deleteAuth')
      } else {
        context.redirect('/?message=unexpected_error')
      }
    }
  }
}
