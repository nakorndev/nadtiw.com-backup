import { Request, Response, NextFunction } from 'express'
import ErrorBuilder from '../modules/ErrorBuilder'

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    const redirectUrl = req.flash('redirectUrl')
    if (redirectUrl) {
      const url = new URL(redirectUrl)
      url.searchParams.append('message', 'need_auth')
      return res.redirect(url.toString())
    } else {
      return next(new ErrorBuilder('กรุณาเข้าสู่ระบบก่อนดำเนินการต่อ'))
    }
  }
  return next()
}
