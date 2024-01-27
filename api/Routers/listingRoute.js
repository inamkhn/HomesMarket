import express from 'express'
import { createListing,getListing,deleteListing,updateListing,getListings,getallListing } from '../controllers/listingController.js'
import {isAuthenticated} from '../middleware/auth.js'
const router = express.Router()

router.route('/addlisting').post(createListing)
router.route('/getlisting/:id').get(getListing)

router.route('/deleteList/:id').delete(isAuthenticated,deleteListing)
router.route('/updatelist/:id').delete(isAuthenticated,updateListing)
router.get('/get/:id',getListings);
router.route('/allListings').get(getallListing)

export default router


