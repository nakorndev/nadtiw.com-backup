import express from 'express'
import CurrentUserController from '../controllers/auth/CurrentUserController'
import LogoutController from '../controllers/auth/LogoutController'

const router = express.Router()

router.get('/', CurrentUserController)
router.delete('/', LogoutController)

export default router
