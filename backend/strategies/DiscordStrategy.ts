import axios from 'axios'
import path from 'path'
import sharp from 'sharp'
import { Strategy, StrategyOptions } from 'passport-discord'
import UsersModel, { UserDocument } from '../models/UsersModel'

const options: StrategyOptions = {
  clientID: process.env.DISCORD_CLIENT_ID as string,
  clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
  callbackURL: process.env.DISCORD_CLIENT_CALLBACK as string,
  scope: ['identify', 'email']
}

async function uploadAvatar (user: UserDocument, discordData) {
  const url = `https://cdn.discordapp.com/avatars/${discordData.discordId}/${discordData.avatar}`
  const avatarRes = await axios.get(url, { responseType: 'arraybuffer' })
  const avatarBuf = Buffer.from(avatarRes.data as string, 'binary')
  const avatarFilename = `${user._id}.jpg`
  const avatarPath = path.resolve(__dirname, '../uploads/avatars/' + avatarFilename)
  await sharp(avatarBuf)
    .jpeg({ quality: 90 })
    .resize({ width: 150, height: 150 })
    .toFile(avatarPath)
  return `/api/uploads/avatars/${avatarFilename}`
}

const verify = async (accessToken, refreshToken, profile, next) => {
  try {
    const discordData = {
      discordId: profile.id,
      email: profile.email,
      avatar: profile.avatar,
      displayName: `${profile.username}#${profile.discriminator}`
    }
    let user = <UserDocument>await UsersModel.findOne({ discordId: discordData.discordId })
    if (user) {
      if (user.avatar !== discordData.avatar) {
        user.avatarUrl = await uploadAvatar(user, discordData)
      }
      user.avatar = discordData.avatar
      user.email = discordData.email
      user.displayName = discordData.displayName
      await user.save()
    } else {
      user = <UserDocument>await UsersModel.create(discordData)
      if (discordData.avatar) {
        user.avatarUrl = await uploadAvatar(user, discordData)
        await user.save()
      }
    }
    return next(null, user)
  } catch (error) {
    return next(error)
  }
}

export default new Strategy(options, verify)
