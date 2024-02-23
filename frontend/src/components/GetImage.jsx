import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GetImage = () => {
  const [images,setImages]=useState({});
  const [img,setImg]=useState(false);
  const fetchImage=()=>{
    axios.get(`http://localhost:5001/api`)
    .then(res => {
      const imagess = res.data;
      setImages(res.data);
    })
  }
  useEffect(fetchImage,[]);
  const handleClick=()=>{
    setImg(!img);
  }
  const handleDelete=async (id)=>{
    try {
      const response = await axios.delete(`http://localhost:5001/api/${id}`, {
        data: { _id: id },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setImg(false);
      if (response.status === 200) {
        toast.success('Item deleted successfully');
        // setImages(response.data)
        window.location.reload(false);
        
      } else {
        console.error('Error deleting item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="text-center">
  <div>
    <h1 className="text-2.5rem font-bold inline-block border-b-4 border-pink-600 text-[#3E3C3C] m-2 mb-0 p-2 pb-0">
      Cloud Images
    </h1>
  </div>

  <button
    type="submit"
    onClick={handleClick}
    className="bg-[#F18D9E] m-2 p-2 rounded-full text-[#3E3C3C]"
  >
    {!img ? 'Fetch Images' : 'Unfetch image'}
  </button>

  <div className="flex flex-wrap justify-center gap-4 relative">
    {img &&
      images.data.map((image) => (
        <div key={image._id} className="mb-4 relative">
          <img
            src={image.url}
            alt="image"
            className="max-w-[300px] h-auto rounded"
          />
          <div className="absolute top-0 right-0 m-2 border border-black text-[#F18D9E] text-xl p-0.5 cursor-pointer" onClick={()=>handleDelete(image._id)}>
            X
          </div>
        </div>
      ))}
  </div>
  <ToastContainer position='top-center'/>
</div>

  
  )
}

export default GetImage