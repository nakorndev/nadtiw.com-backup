import passport from 'passport'
import UsersModel from '../models/UsersModel'
import FacebookStrategy from '../strategies/FacebookStrategy'
import LineStrategy from '../strategies/LineStrategy'
import DiscordStrategy from '../strategies/DiscordStrategy'

export const providers = [
  {
    key: 'facebook',
    scope: [
      'public_profile',
      'user_birthday',
      'user_gender',
      'user_link',
      'user_location'
    ]
  },
  {
    key: 'line',
    scope: 'profile'
  },
  {
    key: 'discord',
    scope: ''
  }
]

passport.use(FacebookStrategy)
passport.use(LineStrategy)
passport.use(DiscordStrategy)

passport.serializeUser((user: any, next) => {
  next(null, user._id)
})

passport.deserializeUser(async (id, next) => {
  try {
    const user = await UsersModel.findById(id)
    next(null, user)
  } catch (error) {
    next(error)
  }
})

export default passport
