import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface Table {
  id: number;
}

const initialState: Table[] = [];

export const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) =>
      (state = action.payload),
    updateTable: (state, action: PayloadAction<Table>) => {
      const newTable = action.payload;
      const foundIndex = state.findIndex((table) => table.id === newTable.id);
      state[foundIndex] = newTable;
      return state;
    },
  },
});

export const { setTables, updateTable } = tableSlice.actions;

export const selectTables = (state: RootState) => state.tables;

export default tableSlice.reducer;
