import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Position {
  myPosition: {
    x: number,
    y: number
  },
  opponentPosition: {
    x: number,
    y: number
  },
  myTurn: boolean,
  moving: boolean,
  opponentMoving: boolean,
  xWithWalls: Array<number>,
  path: Array<number>,
}

const initialState: Position = {
  myPosition: {
    x: 10,
    y: 1
  },
  opponentPosition: {
    x: 10,
    y: 20
  },
  myTurn: true,
  moving: false,
  opponentMoving: false,
  xWithWalls: [],
  path: [
    {x: 10, y: 20},
    {x: 10, y: 19},
    {x: 10, y: 18},
    {x: 10, y: 17},
    {x: 10, y: 16},
    {x: 10, y: 15},
    {x: 10, y: 14},
    {x: 10, y: 13},
    {x: 10, y: 12},
    {x: 10, y: 11},
    {x: 10, y: 10},
    {x: 10, y: 9},
    {x: 10, y: 8},
    {x: 10, y: 7},
    {x: 10, y: 6},
    {x: 10, y: 5},
    {x: 10, y: 4},
    {x: 10, y: 3},
    {x: 10, y: 2},
    {x: 10, y: 1}
  ]
};

export const positionSlice = createAppSlice({
  name: "position",
  initialState,
  reducers: {
    moveUp: (state, action) => {
        state.myPosition.y++;
        state.myTurn = false;
        state.moving = true;
    },
    moveDown: (state, action) => {
        state.myPosition.y--;
        state.myTurn = false;
        state.moving = true;
    },
    moveLeft: (state, action) => {
        state.myPosition.x--;
        state.myTurn = false;
        state.moving = true;
    },
    moveRight: (state, action) => {
        state.myPosition.x++;
        state.myTurn = false;
        state.moving = true;
    },
    moveOpponentUp: (state, action) => {
        state.opponentPosition.y++;
    },
    moveOpponentDown: (state, action) => {
        state.opponentPosition.y--;
    },
    moveOpponentLeft: (state, action) => {
        state.opponentPosition.x--;
    },
    moveOpponentRight: (state, action) => {
        state.opponentPosition.x++;
    },
    setMyTurn: (state, action: PayloadAction<boolean>) => {
      state.myTurn = action.payload;
    },
    setMoving: (state, action: PayloadAction<boolean>) => {
      state.moving = action.payload;
    },
    setOpponentMoving: (state, action: PayloadAction<boolean>) => {
      state.opponentMoving = action.payload;
    },
    setXWithWalls: (state, action: PayloadAction<number>) => {
        state.xWithWalls.push(action.payload);
    },
    setPath: (state, action: PayloadAction<Array<any>>) => {
        state.path = action.payload;
    }
},
  selectors: {
    selectMyPosition: (position) => position.myPosition,
    selectOpponentPosition: (position) => position.opponentPosition,
    selectMyTurn: (position) => position.myTurn,
    selectMoving: (position) => position.moving,
    selectOpponentMoving: (position) => position.opponentMoving,
    selectXWithWalls: (position) => position.xWithWalls,
    selectPath: (position) => position.path
  },
});

export const {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    moveOpponentUp,
    moveOpponentDown,
    moveOpponentLeft,
    moveOpponentRight,
    setMyTurn,
    setMoving,
    setOpponentMoving,
    setXWithWalls,
    setPath
} = positionSlice.actions

export const {
    selectMyPosition,
    selectOpponentPosition,
    selectMyTurn,
    selectMoving,
    selectOpponentMoving,
    selectXWithWalls,
    selectPath
} = positionSlice.selectors;
