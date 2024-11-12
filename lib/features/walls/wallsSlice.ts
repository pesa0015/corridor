import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import phrases from './../../../app/phrases'

export interface Wall {
  myWalls: number;
  opponentWalls: number;
  walls: Array<any>;
  startAddingWallsWhenPosition: number;
  opponentBeganUsingWalls: boolean;
  opponentGotWall: boolean;
  phrases: Array<string>;
  randomPhrase: string;
  shouldSpeak: boolean;
  animation: string;
}

const initialState: Wall = {
  myWalls: 20,
  opponentWalls: 20,
  walls: [],
  startAddingWallsWhenPosition: Math.floor(Math.random() * (7 - 4) + 4),
  opponentBeganUsingWalls: false,
  opponentGotWall: false,
  randomPhrase: null,
  phrases: phrases,
  shouldSpeak: false,
  animation: 'animation-none',
};

export const wallsSlice = createAppSlice({
  name: "walls",
  initialState,
  reducers: {
    decrementMyWalls: (state) => {
      state.myWalls -= 1;
    },
    decrementOpponentWalls: (state) => {
      state.opponentWalls -= 1;
    },
    addWall: (state, action: PayloadAction<any>) => {
        state.walls.push(action.payload);
    },
    setOpponentBeganUsingWalls: (state) => {
        state.opponentBeganUsingWalls = true;
    },
    setOpponentGotWall: (state, action: PayloadAction<any>) => {
        state.opponentGotWall = action.payload;
    },
    setRandomPhrase: (state) => {
        if (state.phrases.length == 0) {
            state.phrases = phrases;
        }

        let phrase = state.phrases[Math.floor(Math.random() * (state.phrases.length - 1) + 1)];
        state.randomPhrase = phrase;

        let index = state.phrases.indexOf(phrase);

        state.phrases.splice(index, 1);
    },
    setShouldSpeak: (state, action: PayloadAction<any>) => {
        state.shouldSpeak = action.payload;
    },
    setAnimation: (state, action: PayloadAction<any>) => {
        state.animation = action.payload;
    }
},
  selectors: {
    selectMyWalls: (walls) => walls.myWalls,
    selectOpponentWalls: (walls) => walls.opponentWalls,
    selectWalls: (walls) => walls.walls,
    selectStartAddingWallsWhenPosition: (walls) => walls.startAddingWallsWhenPosition,
    selectOpponentBeganUsingWalls: (walls) => walls.opponentbeganUsingWalls,
    selectOpponentGotWall: (walls) => walls.opponentGotWall,
    selectRandomPhrase: (walls) => walls.randomPhrase,
    selectShouldSpeak: (walls) => walls.shouldSpeak,
    selectAnimation: (walls) => walls.animation,
  },
});

export const { decrementMyWalls, decrementOpponentWalls, addWall, setOpponentBeganUsingWalls, setOpponentGotWall, setRandomPhrase, setShouldSpeak, setAnimation } = wallsSlice.actions;

export const { selectMyWalls, selectOpponentWalls, selectWalls, selectStartAddingWallsWhenPosition, selectOpponentBeganUsingWalls, selectOpponentGotWall, selectRandomPhrase, selectShouldSpeak, selectAnimation } = wallsSlice.selectors;
