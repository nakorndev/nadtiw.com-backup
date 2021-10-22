import express from 'express'
import CurrentUserController from '../controllers/auth/CurrentUserController'
import LogoutController from '../controllers/auth/LogoutController'
import AuthOnly from '../middleware/AuthOnly'

const router = express.Router()

router.get('/', CurrentUserController)
router.delete('/', AuthOnly, LogoutController)

export default router
