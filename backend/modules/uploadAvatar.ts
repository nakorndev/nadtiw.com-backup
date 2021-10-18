import axios from 'axios'
import sharp from 'sharp'
import path from 'path'
import { UserDocument } from '../models/UsersModel'
import { Request } from 'express'

interface DataAvatar {
  url?: string
  req?: Request
}

export default async (user: UserDocument, data: DataAvatar): Promise<string> => {
  let avatarBuf
  if (data.url) {
    const avatarRes = await axios.get(data.url, { responseType: 'arraybuffer' })
    avatarBuf = Buffer.from(avatarRes.data as string, 'binary')
  } else if (data.req) {
    //
  } else {
    throw new Error('incorrect args')
  }
  const avatarFilename = `${user._id}.jpg`
  const avatarPath = path.resolve(__dirname, '../uploads/avatars/' + avatarFilename)
  await sharp(avatarBuf)
    .jpeg({ quality: 80 })
    .resize({ width: 150 })
    .toFile(avatarPath)
  return `/api/uploads/avatars/${avatarFilename}`
}
