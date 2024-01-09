import express, { Router } from 'express'
import { login, registerUser } from '../controller/user.controller'

const router: Router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)

export default router