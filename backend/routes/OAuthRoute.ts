import express from 'express'
import { request as facebookRequest, callback as facebookCallback } from '../controllers/oauth/FacebookController'
import { request as lineRequest, callback as lineCallback } from '../controllers/oauth/LineController'

const router = express.Router()

router.get('/facebook', facebookRequest)
router.get('/facebook/callback', facebookCallback)

router.get('/line', lineRequest)
router.get('/line/callback', lineCallback)

export default router
