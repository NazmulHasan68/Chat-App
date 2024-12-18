import express from 'express'
import { getOtherUsers, login, logout, register } from '../controllers/user.Controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { getMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/').get(isAuthenticated, getOtherUsers)

export default router