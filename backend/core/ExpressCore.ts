import express from 'express'
import session, { SessionOptions } from 'express-session'
import ms from 'ms'
import path from 'path'
import connectRedis from 'connect-redis'
import PassportCore from './PassportCore'
import { createClient } from 'redis'

const RedisStore = connectRedis(session)
const redisClient = createClient({ url: process.env.REDIS_URL })

const sessionOptions: SessionOptions = {
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('7d')
  },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET as string,
  store: new RedisStore({ client: redisClient })
}

export default (app) => {
  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))
  app.use(express.json())
  app.use(session(sessionOptions))
  app.use(PassportCore.initialize())
  app.use(PassportCore.session())
}
