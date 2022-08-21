import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./TestReducer";

type TreeTabsReduxState = {
  test?: number;
};

type ReduxAction = {
  type: string;
  value: any;
};

const rootReducer = function (
  state: TreeTabsReduxState = {},
  action: ReduxAction
) {
  switch (action.type) {
    case "TEST":
      return { test: state.test ? state.test + 1 : 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
