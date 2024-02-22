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
const uploadImage=async(req,res)=>{
    try {
        const fileStr = req.body.data;
        const pub_id=req.body.pub_id
        // const mt = await cloudinary.image("cloud_castle.jpg", {transformation: [
        //     {width: 350, crop: "scale"},
        //     {fetch_format: "auto"}
        //     ]})
        // console.log(mt);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {width:300});
        const {public_id,asset_id,width,height,format,created_at,type,url,secure_url,orginal_filename}=uploadResponse;
        const newImage=await ImageModel.create({public_id,asset_id,width,height,format,created_at,type,url,secure_url,orginal_filename});
        res.json({ msg: 'Succesfully created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}
module.exports={getAllImages,getSingleImage,uploadImage}