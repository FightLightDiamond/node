import express from 'express'
import controller from '../controllers/user'
import ExtractJWT from '../middleware/extractJWT'

const router = express.Router()

router.get('/validate', ExtractJWT, controller.validateToken)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/get/all', controller.getAllUsers)

export = router