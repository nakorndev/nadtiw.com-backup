import passport from 'passport'
import UsersModel from '../models/UsersModel'
import DiscordStrategy from '../strategies/DiscordStrategy'

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
