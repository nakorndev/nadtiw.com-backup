import passport from 'passport'

export const request = passport.authenticate('line', { scope: 'profile' })

export const callback = passport.authenticate('line', {
  successRedirect: '/?message=auth_ok',
  failureRedirect: '/?message=auth_fail'
})
