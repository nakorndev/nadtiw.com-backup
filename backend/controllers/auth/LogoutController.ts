import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  req.logout()
  return res.sendStatus(204)
}
