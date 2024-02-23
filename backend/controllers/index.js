const mongoose=require('mongoose');
const ImageModel=require('../db/imageModel');
const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getAllImages=async(req,res)=>{
    const allImages=await ImageModel.find({});
    res.json({data:allImages,count:allImages.length});
}   
const getSingleImage=async(req,res)=>{
    const {id}=req.params;
    const singleImage=await ImageModel.find({_id:id});
    res.json({singleImage});
}
const deleteImage=async(req,res)=>{
    const {id}=req.params;
    const delImg=await ImageModel.findOneAndDelete({_id:id});
    res.send(delImg)

}
module.exports={getAllImages,getSingleImage,deleteImage}





