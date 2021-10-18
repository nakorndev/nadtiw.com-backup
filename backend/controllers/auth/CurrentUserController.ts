import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  if (!req.user) {
    return res.sendStatus(401)
  }
  return res.send(req.user)
}
