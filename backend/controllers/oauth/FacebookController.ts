import passport from 'passport'
import passportRedirectOptions from '../../modules/passportRedirectOptions'

const scope = [
  'public_profile',
  'user_birthday',
  'user_gender',
  'user_link',
  'user_location'
]

export const request = passport.authenticate('facebook', { scope })

export const callback = passport.authenticate('facebook', passportRedirectOptions)
