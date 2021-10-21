import { Strategy } from 'passport-line'
import UsersModel, { UserDocument } from '../models/UsersModel'
import uploadAvatar from '../modules/uploadAvatar'

const options = {
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  callbackURL: process.env.LINE_CHANNEL_CALLBACK,
  passReqToCallback: true
}

const verify = async (req, accessToken, refreshToken, profile, next) => {
  try {
    let user = <UserDocument> await UsersModel.findOne({ 'oauth.line': profile._json.userId })
    if (req.user) {
      if (user) {
        return next(null, false, { message: 'user_exists' })
      }
      req.user.oauth.line = profile._json.userId
      await req.user.save()
      return next(null, req.user)
    } else {
      if (!user) {
        user = <UserDocument> await UsersModel.create({
          'oauth.line': profile._json.userId,
          displayName: profile._json.displayName
        })
        const avatarUrl = profile._json.pictureUrl
        if (avatarUrl) {
          user.avatarUrl = await uploadAvatar(user, { url: avatarUrl })
          await user.save()
        }
      }
      return next(null, user)
    }
  } catch (error) {
    return next(error)
  }
}

export default new Strategy(options, verify)
