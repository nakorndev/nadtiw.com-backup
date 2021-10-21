import { Request, Response } from 'express'
import { usernameValidate, maxLengths } from '../../models/UsersModel'

export default (req: Request, res: Response) => {
  res.send({
    username: {
      ...usernameValidate,
      regex: String(usernameValidate.regex).slice(1, -1)
    },
    ...maxLengths
  })
}
