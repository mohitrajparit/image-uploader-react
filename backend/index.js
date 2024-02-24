require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const cloudinary=require('cloudinary')
const ImageModel=require('./db/imageModel')
const app=express();
const getRoutes=require('./routes/index');
app.use(express.json({limit:'10mb'}))
app.use(cors());
const port=process.env.PORT||5001;

app.get('/',async(req,res)=>{
    res.send("<h1>Server for Image Upload</h1>")
})
app.use('/api',getRoutes);
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./public/images');
    },
    filename:function (req,file,cb){
        return cb(null,`${file.originalname}`)
    }
})
const upload=multer({storage});
app.post('/api/upload',upload.single('image'),async(req,res)=>{
    
try {
    const fileStr = req.file.path;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {width:300});
    const {public_id,asset_id,width,height,format,created_at,type,url,secure_url,orginal_filename}=uploadResponse;
    const newImage=await ImageModel.create({public_id,asset_id,width,height,format,created_at,type,url,secure_url,orginal_filename});
 
    fs.unlinkSync(req.file.path);
    
    res.json({ msg: 'Succesfully created' });
} catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
}
})
const start=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`App is listening at port :${port}`);
        })
    } catch (error) {
        
    }
}
start();