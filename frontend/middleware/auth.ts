import { Middleware } from '@nuxt/types'

const middleware: Middleware = (context) => {
  if (!context.store.state.auth.data) {
    context.redirect('/?message=need_auth')
  }
}

export default middleware
