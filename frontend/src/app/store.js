import {configureStore} from '@reduxjs/toolkit'
import imageReducers from '../features/image/imageSlicer'
export const store=configureStore({
    reducer:imageReducers
})