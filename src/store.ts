import { configureStore } from '@reduxjs/toolkit'
// import blogReducer from 'pages/blog/blog.reducer'
import blogReducer from 'pages/remote_blog/blog.slide'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

//Lấy Rootstate và AppDispatch từ store của chúng ta

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
