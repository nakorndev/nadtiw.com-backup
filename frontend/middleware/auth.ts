import { Middleware } from '@nuxt/types'

const middleware: Middleware = async (context) => {
  if (process.server) {
    try {
      await context.$axios.get(context.env.backendUrl + '/auth')
    } catch (error: any) {
      if (error?.response?.status === 401) {
        context.redirect('/?message=need_auth')
      } else {
        context.redirect('/?message=unexpected_error')
      }
    }
  } else {
    if (!context.store.state.auth.data) {
      context.redirect('/?message=need_auth')
    }
  }
}

export default middleware
