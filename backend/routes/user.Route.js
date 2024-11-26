import express from 'express'
import { register } from '../controllers/user.Controller.js'

const router = express.Router()

router.route('/register').post(register)

export default router