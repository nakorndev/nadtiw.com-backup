import express, { Request } from 'express'
import passport from 'passport'
import { capitalize } from 'lodash'
import { promisify } from 'util'
import { providers } from '../core/PassportCore'
import AuthOnly from '../middleware/AuthOnly'
import GuestOnly from '../middleware/GuestOnly'

const router = express.Router()

for (const { key, scope } of providers) {
  router.get(
    `/auth/${key}`,
    (req: Request, res, next) => {
      req.flash('authMode', true)
      req.flash('redirectUrl', process.env.FRONTEND_URL + '/')
      return next()
    },
    GuestOnly,
    passport.authorize(key, { scope })
  )

  router.get(
    `/connect/${key}`,
    (req, res, next) => {
      req.flash('redirectUrl', process.env.FRONTEND_URL + '/settings?tab=connect')
      return next()
    },
    AuthOnly,
    passport.authorize(key, { scope })
  )

  router.get(
    `/callback/${key}`,
    (req, res, next) => {
      passport.authorize(key, (err, user, info) => {
        const redirectUrl = new URL(req.flash('redirectUrl')[0] ?? process.env.FRONTEND_URL)
        const authMode = req.flash('authMode')[0]
        try {
          if (err) throw err
          if (!user) {
            redirectUrl.searchParams.append('message', info.message ?? info ?? 'unexpected_error')
            return res.redirect(redirectUrl.toString())
          }
          if (authMode) {
            req.login(user, (err) => {
              if (err) throw err
              redirectUrl.searchParams.append('message', 'auth_ok')
              return res.redirect(redirectUrl.toString())
            })
          } else {
            redirectUrl.searchParams.append('message', 'connect_ok')
            redirectUrl.searchParams.append('provider', capitalize(key))
            return res.redirect(redirectUrl.toString())
          }
        } catch (error) {
          redirectUrl.searchParams.append('message', 'unexpected_error')
          return res.redirect(redirectUrl.toString())
        }
      })(req, res, next)
    }
  )
}

export default router
