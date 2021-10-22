import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/discord', passport.authenticate('discord'))
router.get('/discord/callback', passport.authenticate('discord', {
  failureRedirect: process.env.FRONTEND_URL + '/?message=unexpected_error',
  successRedirect: process.env.FRONTEND_URL + '/?message=auth_ok'
}))

export default router
