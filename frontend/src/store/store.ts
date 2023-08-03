import { configureStore } from '@reduxjs/toolkit'
import openBlanksReduser from './slice/openBlanksSlice'
import openProjectReduser from './slice/openProjectSlice'
import openModalReduser from './slice/openModalSlice'


export const store = configureStore({
  reducer: {
    openBlanks: openBlanksReduser,
    openProjects: openProjectReduser,
    openModal: openModalReduser
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch