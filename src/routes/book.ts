import express from 'express'
import controller from '../controllers/book'

const router = express.Router()
router.get('/ping', controller.serverHealthCheck)
router.get('/get/books', controller.getAllBooks)
router.post('/create', controller.createBook)
router.post('/upload', controller.upload)
export = router