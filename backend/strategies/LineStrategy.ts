import { Strategy } from 'passport-line'
import UsersModel, { UserDocument } from '../models/UsersModel'
import uploadAvatar from '../modules/uploadAvatar'

const options = {
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  callbackURL: process.env.LINE_CHANNEL_CALLBACk
}

const verify = async (accessToken, refreshToken, profile, next) => {
  try {
    let user = await UsersModel.findOne({ 'oauth.line': profile._json.userId }) as UserDocument
    if (!user) {
      user = await UsersModel.create({
        'oauth.line': profile._json.userId,
        displayName: profile._json.displayName
      }) as UserDocument
      const avatarUrl = profile._json.pictureUrl
      if (avatarUrl) {
        user.avatarUrl = await uploadAvatar(user, { url: avatarUrl })
        await user.save()
      }
    }
    return next(null, user)
  } catch (error) {
    return next(error)
  }
}

export default new Strategy(options, verify)
