import express from 'express'
import { request as facebookRequest, callback as facebookCallback } from '../controllers/oauth/FacebookController'
import { request as lineRequest, callback as lineCallback } from '../controllers/oauth/LineController'
import { request as discordRequest, callback as discordCallback } from '../controllers/oauth/DiscordController'

const router = express.Router()

router.get('/facebook', facebookRequest)
router.get('/facebook/callback', facebookCallback)

router.get('/line', lineRequest)
router.get('/line/callback', lineCallback)

router.get('/discord', discordRequest)
router.get('/discord/callback', discordCallback)

export default router
