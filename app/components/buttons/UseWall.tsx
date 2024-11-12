import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMyTurn } from "@/lib/features/position/positionSlice";
import { decrementMyWalls, addWall } from "@/lib/features/walls/wallsSlice";

const UseWall = ({walls, opponent, direction} : {walls: any[], opponent: object, direction: string}) => {
    const [showTopArrow, setShowTopArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [showBottomArrow, setShowBottomArrow] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const dispatch = useAppDispatch();

    function handleClickButton() {
        let arrowsToAdd = {
            'top': true,
            'right': true,
            'bottom': true,
            'left': true
        };

        for (let i = 0; i < walls.length; i++) {
            if (opponent.x === walls[i].x && opponent.y + 1 === walls[i].y && walls[i].directions.includes('bottom')) {
                arrowsToAdd['top'] = false;
            }

            if (opponent.x === walls[i].x && opponent.y === walls[i].y && walls[i].directions.includes('right')) {
                arrowsToAdd['right'] = false;
            }

            if (opponent.x === walls[i].x && opponent.y === walls[i].y && walls[i].directions.includes('bottom')) {
                arrowsToAdd['bottom'] = false;
            }

            if (opponent.x - 1 === walls[i].x && opponent.y === walls[i].y && walls[i].directions.includes('right')) {
                arrowsToAdd['left'] = false;
            }
        }

        if (arrowsToAdd['top']) {
            setShowTopArrow(true);
        }

        if (arrowsToAdd['right']) {
            setShowRightArrow(true);
        }

        if (arrowsToAdd['bottom']) {
            setShowBottomArrow(true);
        }

        if (arrowsToAdd['left']) {
            setShowLeftArrow(true);
        }
    }

    function handleClickArrows(event: React.SyntheticEvent<EventTarget>) {
        let direction = (event.target as HTMLDivElement).className.split(' ')[2];

        if (direction === 'top') {
            dispatch(addWall({x: opponent.x, y: opponent.y - 1, 'directions': 'bottom'}));
        }

        if (direction === 'right') {
            dispatch(addWall({x: opponent.x, y: opponent.y, 'directions': 'right'}));
        }

        if (direction === 'left') {
            dispatch(addWall({x: opponent.x - 1, y: opponent.y, 'directions': 'right'}));
        }

        if (direction === 'bottom') {
            dispatch(addWall({x: opponent.x, y: opponent.y, 'directions': 'bottom'}));
        }

        dispatch(setMyTurn(false));
        dispatch(decrementMyWalls());
        setShowTopArrow(false);
        setShowRightArrow(false);
        setShowBottomArrow(false);
        setShowLeftArrow(false);
    }

    return null;

    return (
        <div>
            <button onClick={handleClickButton}>Add wall</button>
            {showTopArrow ? <div className='arrows arrow top' onClick={handleClickArrows}></div> : null}
            {showRightArrow ? <div className='arrows arrow right' onClick={handleClickArrows}></div> : null}
            {showBottomArrow ? <div className='arrows arrow bottom' onClick={handleClickArrows}></div> : null}
            {showLeftArrow ? <div className='arrows arrow left' onClick={handleClickArrows}></div> : null}
        </div>
    );
}

export default UseWall;