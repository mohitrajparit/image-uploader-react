import { createSlice } from "@reduxjs/toolkit";

const initialState={
    image :{},
    img:false,
}
export const imageSlice=createSlice({
    name:'images',
    initialState,
    reducer:{
        
    }
})

export const {addTodo}=imageSlice.actions

export default imageSlice.reducer;