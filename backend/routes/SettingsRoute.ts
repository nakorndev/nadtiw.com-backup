import express from 'express'
import GetValidationsController from '../controllers/settings/GetValidationsController'
import UpdateController from '../controllers/settings/UpdateController'
import AuthOnly from '../middleware/AuthOnly'

const router = express.Router()

router.use(AuthOnly)

router.post('/', UpdateController)
router.get('/validations', GetValidationsController)

export default router
