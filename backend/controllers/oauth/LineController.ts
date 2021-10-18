import passport from 'passport'
import passportRedirectOptions from '../../modules/passportRedirectOptions'

export const request = passport.authenticate('line', { scope: 'profile' })

export const callback = passport.authenticate('line', passportRedirectOptions)
