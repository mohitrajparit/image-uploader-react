const mongoose=require('mongoose');

const ImageScehma=mongoose.Schema({
    assest_id:{
        type:String,
    },
    public_id:{
        type:String,  
    },
    width:{
        type:Number,  
    },
    height:{
        type:Number,  
    },
    format:{
        type:String,  
    },
    
    created_at:{
        type:String,  
    },
    type:{
        type:String,  
    },
    url:{
        type:String,  
    },
    secure_url:{
        type:String,  
    }  
})
module.exports=mongoose.model('Image',ImageScehma);