import axios from 'axios'
import sharp from 'sharp'
import path from 'path'
import { UserDocument } from '../models/UsersModel'
import { Request } from 'express'

interface RequestWithFile extends Request {
  file: any
}

interface DataAvatar {
  url?: string
  req?: Request | RequestWithFile
}

export default async (user: UserDocument, data: DataAvatar): Promise<string> => {
  let avatarBuf
  if (data.url) {
    const avatarRes = await axios.get(data.url, { responseType: 'arraybuffer' })
    avatarBuf = Buffer.from(avatarRes.data as string, 'binary')
  } else if (data.req?.file) {
    if (!Buffer.isBuffer(data.req.file.buffer)) {
      throw new Error('No buffer')
    }
    avatarBuf = data.req.file.buffer
  } else {
    throw new Error('Incorrect arguments')
  }
  const avatarFilename = `${user._id}.jpg`
  const avatarPath = path.resolve(__dirname, '../uploads/avatars/' + avatarFilename)
  await sharp(avatarBuf)
    .jpeg({ quality: 90 })
    .resize({ width: 150, height: 150 })
    .toFile(avatarPath)
  return `/api/uploads/avatars/${avatarFilename}`
}
