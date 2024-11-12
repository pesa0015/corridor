'use client';

import { useState, useEffect } from 'react';
import ButtonUp from './components/buttons/ButtonUp';
import ButtonLeft from './components/buttons/ButtonLeft';
import ButtonRight from './components/buttons/ButtonRight';
import ButtonDown from './components/buttons/ButtonDown';
import UseWall from './components/buttons/UseWall';
import WallOnPosition from './components/wallOnPosition/WallOnPosition';
import Winner from './components/Winner/Winner';
import Header from './components/Header/Header';
import Map from './components/map/Map';
import {
    selectWalls,
    selectStartAddingWallsWhenPosition,
    selectOpponentBeganUsingWalls,
    selectOpponentGotWall,
    addWall,
    decrementOpponentWalls,
    setOpponentBeganUsingWalls
} from "@/lib/features/walls/wallsSlice";
import {
    selectMyPosition,
    selectOpponentPosition,
    selectMyTurn,
    selectXWithWalls,
    setMyTurn,
    setMoving,
    setOpponentMoving,
    moveOpponentUp,
    moveOpponentDown,
    moveOpponentLeft,
    moveOpponentRight,
    setOpponentPosition
} from "@/lib/features/position/positionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    const myPosition = useAppSelector(selectMyPosition);
    const opponent = useAppSelector(selectOpponentPosition);
    const walls = useAppSelector(selectWalls);
    const myTurn = useAppSelector(selectMyTurn);
    const startAddingWallsWhenPosition = useAppSelector(selectStartAddingWallsWhenPosition);
    const opponentBeganUsingWalls = useAppSelector(selectOpponentBeganUsingWalls);
    const opponentGotWall = useAppSelector(selectOpponentGotWall);
    const xWithWalls = useAppSelector(selectXWithWalls);

    let nearestXWithoutWall = [];

    const addFirstOpponentWall = () => {
        dispatch(setOpponentBeganUsingWalls());
        dispatch(decrementOpponentWalls());
        dispatch(setMyTurn(true));

        switch (Math.floor(Math.random() * (3 - 1) + 1)) {
            case 1:
                dispatch(addWall({x: myPosition.x, y: myPosition.y + 1, 'directions': 'bottom'}));
                return true;
            case 2:
                dispatch(addWall({x: myPosition.x - 1, y: myPosition.y + 1, 'directions': 'right'}));
                return true;
            case 3:
                dispatch(addWall({x: myPosition.x, y: myPosition.y + 1, 'directions': 'right'}));
                return true;
        }
    }

    const addRandomOpponentWall = () => {
        dispatch(setOpponentBeganUsingWalls());
        dispatch(decrementOpponentWalls());
        dispatch(setMyTurn(true));
        
        if (!WallOnPosition(walls, myPosition, 'up')) {
            dispatch(addWall({x: myPosition.x, y: myPosition.y + 1, 'directions': 'bottom'}));
        } else if (!WallOnPosition(walls, myPosition, 'left')) {
            dispatch(addWall({x: myPosition.x - 1, y: myPosition.y, 'directions': 'right'}));
        } else if (!WallOnPosition(walls, myPosition, 'right')) {
            dispatch(addWall({x: myPosition.x, y: myPosition.y, 'directions': 'right'}));
        }
        dispatch(decrementOpponentWalls());
        dispatch(setMyTurn(true));
    }

    const moveOpponent = () => {
        dispatch(setOpponentMoving(true));
        setTimeout(() => {
            dispatch(setOpponentMoving(false));

            if (xWithWalls.length == 0) {
                dispatch(moveOpponentDown());
            } else {
                for (let i = opponent.x; i >= 1; i++) {
                    if (!xWithWalls.includes(i)) {
                        nearestXWithoutWall.push(i);
                    }
                }

                for (let i = opponent.x; i <= 20; i++) {
                    if (!xWithWalls.includes(i)) {
                        nearestXWithoutWall.push(i);
                    }
                }

                if (nearestXWithoutWall.length == 2) {
                    if (opponent.x - nearestXWithoutWall[0] == nearestXWithoutWall[1] - opponent.x) {
                        switch (Math.floor(Math.random() * (2 - 1) + 1)) {
                            case 1:
                                dispatch(moveOpponentLeft());
                            case 2:
                                dispatch(moveOpponentRight());
                        }
                    } else {
                        if (opponent.x - nearestXWithoutWall[0] < nearestXWithoutWall[1] - opponent.x) {
                            dispatch(moveOpponentLeft());
                        } else {
                            dispatch(moveOpponentRight());
                        }
                    }
                } else {
                    if (nearestXWithoutWall[0] < opponent.x) {
                        dispatch(moveOpponentLeft());
                    } else {
                        dispatch(moveOpponentRight());
                    }
                }
            }

            // if (!WallOnPosition(walls, opponent, 'bottom')) {
            //     dispatch(moveOpponentDown());
            // } else if (!WallOnPosition(walls, opponent, 'left')
            //     && !WallOnPosition(walls, opponent, 'right')
            //     && opponent.x != 1
            //     && opponent.x != 20) {
            //     switch (Math.floor(Math.random() * (2 - 1) + 1)) {
            //         case 1:
            //             dispatch(moveOpponentLeft());
            //             return true;
            //         case 2:
            //             dispatch(moveOpponentRight());
            //             return true;
            //     }
            // } else if (!WallOnPosition(walls, opponent, 'left') && opponent.x != 1) {
            //     dispatch(moveOpponentLeft());
            // } else if (!WallOnPosition(walls, opponent, 'right') && opponent.x != 20) {
            //     dispatch(moveOpponentRight());
            // } else if (!WallOnPosition(walls, opponent, 'up')) {
            //     dispatch(moveOpponentUp());
            // }
        }, 1000);
    }

    useEffect(() => {
        if (!myTurn) {
            setTimeout(() => {
                dispatch(setMoving(false));
                setTimeout(() => {
                    if (startAddingWallsWhenPosition == myPosition.y && !opponentBeganUsingWalls) {
                        addFirstOpponentWall();
                    } else if (opponentBeganUsingWalls && Math.floor(Math.random() * (3 - 1) + 1) == 1) {
                        addRandomOpponentWall();
                    } else {
                        moveOpponent();
                    }
                }, 1000);
            }, 1000);
            dispatch(setMyTurn(true));
        }
    });

    return (
        <div className="wrapper">
            <Winner myPosition={myPosition}/>
            <Header/>
            <Map walls={walls}/>
            <div className="buttons">
                <ButtonLeft/>
                <ButtonUp/>
                <ButtonDown/>
                <ButtonRight/>
            </div>
            <div className="buttons mobile">
                <UseWall walls={walls} myPosition={myPosition} opponent={opponent}/>
            </div>
        </div>
    );
}