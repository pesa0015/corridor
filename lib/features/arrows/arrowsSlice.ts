import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Arrow {
  top: Array<number>;
  right: Array<number>;
  bottom: Array<number>;
  left: Array<number>;
}

const initialState: Arrow = {
  top: [],
  right: [],
  bottom: [],
  left: []
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const arrowsSlice = createAppSlice({
  name: "arrows",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTop: (state, action: PayloadAction<Array<number>>) => {
        state.top = action.payload;
    },
    setRight: (state, action: PayloadAction<Array<number>>) => {
        state.right = action.payload;
    },
    setBottom: (state, action: PayloadAction<Array<number>>) => {
        state.bottom = action.payload;
    },
    setLeft: (state, action: PayloadAction<Array<number>>) => {
        state.left = action.payload;
    },
},
  selectors: {
    selectTop: (arrows) => arrows.top,
    selectRight: (arrows) => arrows.right,
    selectBottom: (arrows) => arrows.bottom,
    selectLeft: (arrows) => arrows.left
  },
});

export const { setTop, setRight, setBottom, setLeft } = arrowsSlice.actions;

export const { selectTop, selectRight, selectBottom, selectLeft } = arrowsSlice.selectors;
