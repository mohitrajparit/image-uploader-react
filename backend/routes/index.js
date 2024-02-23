const express=require('express');
const router=express.Router();
const {getAllImages,getSingleImage,deleteImage}=require('../controllers/index')


router.route('/').get(getAllImages);
// router.post('/upload',upload.single('image'),uploadImage);
router.route('/:id').get(getSingleImage);
router.delete('/:id',deleteImage);
module.exports=router;