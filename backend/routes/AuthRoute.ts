import express from 'express'
import CurrentUserController from '../controllers/auth/CurrentUserController'
import DeleteUserController from '../controllers/auth/DeleteUserController'
import LogoutController from '../controllers/auth/LogoutController'
import AuthOnly from '../middleware/AuthOnly'

const router = express.Router()

router.get('/', CurrentUserController)
router.delete('/', AuthOnly, LogoutController)
router.delete('/user', AuthOnly, DeleteUserController)

export default router
