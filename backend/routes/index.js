const express=require('express');
const router=express.Router();
const {getAllImages,getSingleImage,uploadImage}=require('../controllers/index')
router.route('/').get(getAllImages);
router.route('/upload').post(uploadImage);
router.route('/:id').get(getSingleImage);

module.exports=router;