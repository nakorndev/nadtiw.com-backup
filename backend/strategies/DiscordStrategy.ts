import { Strategy, StrategyOptions } from 'passport-discord'
import UsersModel, { UserDocument } from '../models/UsersModel'
import uploadAvatar from '../modules/uploadAvatar'

const options: StrategyOptions = {
  clientID: process.env.DISCORD_CLIENT_ID as string,
  clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
  callbackURL: process.env.DISCORD_CLIENT_CALLBACK as string,
  scope: ['identify']
}

const verify = async (accessToken, refreshToken, profile, next) => {
  try {
    let user = await UsersModel.findOne({ 'oauth.discord': profile.id }) as UserDocument
    if (!user) {
      user = await UsersModel.create({
        'oauth.discord': profile.id,
        displayName: `${profile.username}#${profile.discriminator}`
      }) as UserDocument
      const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`
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
