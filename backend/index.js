require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const app=express();
const getRoutes=require('./routes/index');
app.use(express.json({limit:'50mb'}))
app.use(cors());
const port=process.env.PORT||5001;

app.use('/api',getRoutes);

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