import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import tableReducer from "./slices/table.slice";

export const store = configureStore({
  reducer: {
    tables: tableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
