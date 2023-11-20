import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: GetProState;
};
type GetProState = {
  isOpen: boolean;
};

const initialState = {
  value: {
    isOpen: false,
  } as GetProState,
} as InitialState;
const getProSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleOpenOrClose: (state) => {
      state.value.isOpen = !state.value.isOpen; 
    },
    closeProModel: (state) => {
      state.value.isOpen = false;
    },
  },
});

export const { toggleOpenOrClose, closeProModel } = getProSlice.actions;
export default getProSlice.reducer;
