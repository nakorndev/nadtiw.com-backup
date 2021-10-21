import { Request } from 'express'
import { Strategy, StrategyOptionsWithRequest } from 'passport-discord'
import UsersModel, { UserDocument } from '../models/UsersModel'
import uploadAvatar from '../modules/uploadAvatar'

const options: StrategyOptionsWithRequest = {
  clientID: process.env.DISCORD_CLIENT_ID as string,
  clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
  callbackURL: process.env.DISCORD_CLIENT_CALLBACK as string,
  scope: ['identify'],
  passReqToCallback: true
}

const verify = async (req: Request, accessToken, refreshToken, profile, next) => {
  try {
    let user = <UserDocument> await UsersModel.findOne({ 'oauth.discord': profile.id })
    if (req.user) {
      if (user) {
        return next(null, false, { message: 'user_exists' })
      }
      req.user.oauth.discord = profile.id
      await req.user.save()
      return next(null, req.user)
    } else {
      if (!user) {
        user = <UserDocument> await UsersModel.create({
          'oauth.discord': profile.id,
          displayName: `${profile.username}#${profile.discriminator}`
        })
        const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`
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
