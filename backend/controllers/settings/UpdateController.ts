import { Request, Response } from 'express'
import multer from 'multer'
import bytes from 'bytes'
import UsersModel from '../../models/UsersModel'
import ErrorBuilder from '../../modules/ErrorBuilder'
import uploadAvatar from '../../modules/uploadAvatar'

export const fileSizeLimit = bytes('2MB')

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: fileSizeLimit,
    files: 1
  }
})

export default [
  upload.single('avatarFile'),
  async (req: Request, res: Response) => {
    const userExists = await UsersModel.count({ username: req.body.username })
    if (userExists !== 0 && req.user.username !== req.body.username) {
      throw new ErrorBuilder('ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว กรุณาเลือกชื่ออื่น')
    }
    if (req.file) {
      req.user.avatarUrl = await uploadAvatar(req.user, { req })
    }
    req.user.username = req.body.username
    req.user.displayName = req.body.displayName
    req.user.gender = req.body.gender
    req.user.birthDate = req.body.birthDate
    req.user.location = req.body.location
    req.user.bio = req.body.bio
    await req.user.save()
    return res.send(req.user)
  }
]
