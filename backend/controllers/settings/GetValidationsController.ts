import { Request, Response } from 'express'
import { usernameValidate, maxLengths } from '../../models/UsersModel'
import { fileSizeLimit } from './UpdateController'

export default (req: Request, res: Response) => {
  res.send({
    username: {
      ...usernameValidate,
      regex: String(usernameValidate.regex).slice(1, -1)
    },
    avatarFile: fileSizeLimit,
    ...maxLengths
  })
}
