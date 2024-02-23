import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UploadImage = () => {
    const [img,setImg]=useState(null);
    const uploadHandler=(e)=>{
        const file=e.target.files[0];
        setImg(file);
    }
    
    const handleUpload = async () => {
        if (img) {
          const formData = new FormData();
          formData.append('image', img);
    
            const response = await axios.post('http://localhost:5001/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then(
              toast.success("Image Uploaded!" )
              )
            .catch((error)=>console.log(error))
            window.location.reload(false);
        }
        else{
          toast.error("Please provide the image");
        }
      };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
  <div className="mb-8">
    <input
      type="file"
      name="file"
      onChange={uploadHandler}
      className="m-2 p-2 border border-gray-300 rounded-md"
    />
    <button
      type="submit"
      className="bg-[#db7586] text-white m-2 p-2 rounded-md text-[#3f3e3e]"
      onClick={handleUpload}
    >
      Upload
    </button>
    <ToastContainer position='top-center'/>
  </div>
</div>

  )
}

export default UploadImage