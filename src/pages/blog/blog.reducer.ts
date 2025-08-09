import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { log } from 'console'
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

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const finishUpdatePost = createAction<Post>('blog/finishUpdatePost')
const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const foundIDdelete = state.postList.findIndex((post) => post.id === postId)
      if (foundIDdelete !== -1) {
        state.postList.splice(foundIDdelete, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const foundID = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundID
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishUpdatePost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
    .addMatcher((action)=>action.type.includes('cancel'),(state,action)=>{
      console.log(current(state))
    })
    .addDefaultCase((state,action)=>{})
})

export default blogReducer
