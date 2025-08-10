import { createAction, createReducer, createSlice, current, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}


const blogSlide = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundIDdelete = state.postList.findIndex((post) => post.id === postId)
      if (foundIDdelete !== -1) {
        state.postList.splice(foundIDdelete, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundID = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundID
    },
    cancelEditingPost:(state)=>{
       state.editingPost = null
    },
    finishUpdatePost:(state, action : PayloadAction<Post>) =>{
       const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    },
   addPost: {
    reducer: (state,action : PayloadAction<Post> ) => {
      const post = action.payload
      state.postList.push(post)
    },
    prepare: (post : Omit<Post,'id'>)=>({
        payload:{
          ...post,
          id : nanoid()
        }
      })
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type}`, current(state))
      })
  }
})
export const {addPost,cancelEditingPost,deletePost,finishUpdatePost,startEditingPost} = blogSlide.actions
const blogReducer =blogSlide.reducer

export default blogReducer
