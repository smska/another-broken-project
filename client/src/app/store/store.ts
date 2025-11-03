import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/Counter/redux/counterSlice";
import userReducer from "@/entities/user/redux/userSlice";
import adviceReducer from "@/entities/advice/redux/adviceSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    advice: adviceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
