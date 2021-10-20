import { Strategy, StrategyOption, VerifyFunction } from 'passport-facebook'
import { DateTime } from 'luxon'
import axios from 'axios'
import sharp from 'sharp'
import path from 'path'
import UsersModel, { UserDocument } from '../models/UsersModel'
import uploadAvatar from '../modules/uploadAvatar'

declare var process: {
  env: {
    FACEBOOK_APP_ID: string,
    FACEBOOK_APP_SECRET: string,
    FACEBOOK_APP_CALLBACK: string
  }
}

const profileFields = [
  'id',
  'birthday',
  'gender',
  'link',
  'location',
  'name',
  'picture.type(large)'
]

const options: StrategyOption = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACK,
  profileFields
}

const selectGender = (str: string) => {
  switch (str) {
    case 'male': return 'male'
    case 'female': return 'female'
    default: return 'none'
  }
}

const verify: VerifyFunction = async (accessToken, refreshToken, profile, next) => {
  try {
    let user = await UsersModel.findOne({ 'oauth.facebook': profile._json.id }) as UserDocument
    if (!user) {
      user = await UsersModel.create({
        'oauth.facebook': profile._json.id,
        'social.facebook': profile._json.link,
        displayName: profile._json.first_name + ' ' + profile._json.last_name,
        birthDate: DateTime.fromFormat(profile._json.birthday, 'MM/dd/yyyy', { zone: 'utc' }).toJSDate(),
        gender: selectGender(profile._json.gender),
        location: profile._json.location.name
      }) as UserDocument
      const avatarUrl = profile._json?.picture?.data?.url as string
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

//@ts-ignore
export default new Strategy(options, verify)
