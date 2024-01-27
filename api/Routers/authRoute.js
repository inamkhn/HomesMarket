import express from 'express'
import {createUser,Login,googleLogin,signOut} from '../controllers/authController.js'

const router = express.Router()

router.route('/create').post(createUser)
router.route('/login').post(Login)
router.route('/google').post(googleLogin)
router.route('/signout').post(signOut)


export default router