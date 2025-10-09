import express from 'express'
import { registerUser, getMe, loginUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)        // POST /api/users
router.post('/login', loginUser)      // POST /api/users/login
router.get('/me', protect, getMe)     // GET /api/users/me

export default router
