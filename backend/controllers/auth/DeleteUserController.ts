import { Request, Response } from 'express'
import UsersModel from '../../models/UsersModel'

export default async (req: Request, res: Response) => {
  await UsersModel.findByIdAndDelete(req.user._id)
  return res.sendStatus(204)
}
