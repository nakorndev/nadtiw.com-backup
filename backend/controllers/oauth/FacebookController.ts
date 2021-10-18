import passport from 'passport'

const scope = [
  'email',
  'public_profile',
  'user_birthday',
  'user_gender',
  'user_link',
  'user_location'
]

export const request = passport.authenticate('facebook', { scope })

export const callback = passport.authenticate('facebook', {
  successRedirect: '/?message=auth_ok',
  failureRedirect: '/?message=auth_fail'
})
