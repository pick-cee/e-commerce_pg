import express, { Router } from 'express'
import { deleteProfile, getProfile, login, registerUser, updateProfile } from '../controller/user.controller'
import { verifyToken } from '../middleware/verifyToken'

const router: Router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.get('/profile', verifyToken, getProfile)
router.put('/update', verifyToken, updateProfile)
router.delete('/delete', verifyToken, deleteProfile)

export default router