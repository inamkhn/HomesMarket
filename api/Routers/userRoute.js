import express from 'express'
import {updateUser,deleteUser,getUserListings,getUser} from '../controllers/userController.js'
import {isAuthenticated} from '../middleware/auth.js'
const router = express.Router()

router.route('/:id').get(getUser)
router.route('/update/:id').put(isAuthenticated,updateUser)
router.route('/delete/:id').delete(isAuthenticated,deleteUser)
router.route('/userlisting/:id').get(isAuthenticated,getUserListings)  //isAuthenticated

export default router

