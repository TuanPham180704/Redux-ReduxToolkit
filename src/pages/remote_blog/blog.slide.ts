import { createAsyncThunk, createSlice, current, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'

import http from 'pages/remote_blog/utils/http'
import { Post } from 'types/blog.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
interface BlogState {
  postList: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestID: undefined | string
}

const initialState: BlogState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestID: undefined
}

export const getPostList = createAsyncThunk('blog/getPostList', async (__, thunkAPI) => {
  const response = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return response.data
})

// export const updatePost = createAsyncThunk(
//   'blog/updatePost',
//   async ({ postID, body }: { postID: string; body: Post }, thunkAPI) => {
//     const response = await http.put<Post>(`posts/${postID}`, body, {
//       signal: thunkAPI.signal
//     })
//     return response.data
//   }
// )
export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: string; body: Post }, thunkAPI) => {
    try {
      const response = await http.put<Post>(`posts/${postId}`, body, {
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)
export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<Post, 'id'>, thunkAPI) => {
  try {
    const response = await http.post<Post>('posts', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError' && error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const deletePost = createAsyncThunk('blog/deletePost', async (postID: string, thunkAPI) => {
  const response = await http.delete<Post>(`posts/${postID}`, {
    signal: thunkAPI.signal
  })
  return response.data
})

const blogSlide = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundID = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundID
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.meta.arg
        const deleteId = state.postList.findIndex((post) => post.id === postId)
        if (deleteId !== -1) {
          state.postList.splice(deleteId, 1)
        }
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestID = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestID === action.meta.requestId) {
            state.loading = false
            state.currentRequestID = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type}`, current(state))
      })
  }
})
export const { cancelEditingPost, startEditingPost } = blogSlide.actions
const blogReducer = blogSlide.reducer

export default blogReducer
