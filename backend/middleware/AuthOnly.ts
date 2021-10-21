import { Request, Response, NextFunction } from 'express'
import ErrorBuilder from '../modules/ErrorBuilder'

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorBuilder('กรุณาเข้าสู่ระบบก่อนดำเนินการต่อ'))
  }
  return next()
}
