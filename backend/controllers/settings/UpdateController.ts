import { Request, Response } from 'express'
import UsersModel from '../../models/UsersModel'
import ErrorBuilder from '../../modules/ErrorBuilder'

export default async (req: Request, res: Response) => {
  const userExists = await UsersModel.count({ username: req.body.username })
  if (userExists !== 0 && req.user.username !== req.body.username) {
    throw new ErrorBuilder('ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว กรุณาเลือกชื่ออื่น')
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
