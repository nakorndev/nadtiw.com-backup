import passport from 'passport'
import passportRedirectOptions from '../../modules/passportRedirectOptions'

export const request = passport.authenticate('discord')

export const callback = passport.authenticate('discord', passportRedirectOptions)
