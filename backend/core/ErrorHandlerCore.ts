import { NextFunction, Request, Response } from 'express'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const code = (err.status ?? 500) as number
  const error = (err?.message ?? err ?? 'พบปัญหาบางอย่างไม่คาดคิด') as string
  if (code >= 500) {
    console.error('[Internal Server Error]', new Date(), err)
  }
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Development Error]', new Date(), err)
  }
  return res.status(code).send({ error })
}
