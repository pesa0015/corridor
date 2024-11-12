import {
  selectMyPosition,
  selectOpponentPosition,
  selectMoving,
  selectOpponentMoving,
  setMyTurn,
  selectPath,
  setPath
} from "@/lib/features/position/positionSlice";
import {
  selectWalls,
  decrementMyWalls,
  addWall,
  setOpponentGotWall,
  setRandomPhrase,
  setShouldSpeak,
  setAnimation,
} from "@/lib/features/walls/wallsSlice";
import {
  selectTop,
  selectRight,
  selectBottom,
  selectLeft,
  setTop,
  setRight,
  setBottom,
  setLeft
} from "@/lib/features/arrows/arrowsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import mario from './../../../public/mario.png';
import mariomoving from './../../../public/mario-gif.gif';
import luigi from './../../../public/luigi.png';
import luigimoving from './../../../public/luigi-gif-2.gif';

function getPosition(id: string) {
    let position = id.split('-').slice(1).map(function (value) { 
        return parseInt(value); 
    });

    return position;
}

const InnerField = ({x, y} : {x: number, y: number}) => {
    const dispatch = useAppDispatch();
    const myPosition = useAppSelector(selectMyPosition);
    const opponentPosition = useAppSelector(selectOpponentPosition);
    const moving = useAppSelector(selectMoving);
    const opponentMoving = useAppSelector(selectOpponentMoving);
    const walls = useAppSelector(selectWalls);
    const countTop = useAppSelector(selectTop);
    const countRight = useAppSelector(selectRight);
    const countBottom = useAppSelector(selectBottom);
    const countLeft = useAppSelector(selectLeft);
    const path = useAppSelector(selectPath);

    function handleClickField(event: React.SyntheticEvent<EventTarget>) {
        if (countTop.length != 0 || countRight.length != 0 || countBottom.length != 0 || countRight.length != 0) {
            dispatch(setTop([]));
            dispatch(setRight([]));
            dispatch(setLeft([]));
            dispatch(setBottom([]));

            return true;
        }

//         const { target } = event;
// console.log(event.nativeEvent.target as HTMLDivElement);
        // if (!event.nativeEvent.target) {
        //     return false;
        // }

        let position = getPosition((event.nativeEvent.target as HTMLDivElement).id);

        let arrowsToAdd = {
            'top': true,
            'right': true,
            'bottom': true,
            'left': true
        };

        for (let i = 0; i < walls.length; i++) {
            if (position[0] === walls[i].x && position[1] + 1 === walls[i].y && walls[i].directions.includes('bottom')) {
                arrowsToAdd['top'] = false;
            }

            if (position[0] === walls[i].x && position[1] === walls[i].y && walls[i].directions.includes('right')) {
                arrowsToAdd['right'] = false;
            }

            if (position[0] === walls[i].x && position[1] === walls[i].y && walls[i].directions.includes('bottom')) {
                arrowsToAdd['bottom'] = false;
            }

            if (position[0] - 1 === walls[i].x && position[1] === walls[i].y && walls[i].directions.includes('right')) {
                arrowsToAdd['left'] = false;
            }
        }

        if (arrowsToAdd['top']) {
            dispatch(setTop([position[0], position[1] + 1]));
        }

        if (arrowsToAdd['right']) {
            dispatch(setRight([position[0] + 1, position[1]]));
        }

        if (arrowsToAdd['bottom']) {
            dispatch(setBottom([position[0], position[1] - 1]));
        }

        if (arrowsToAdd['left']) {
            dispatch(setLeft([position[0] - 1, position[1]]));
        }
    }

    function handleClickArrows(event: React.SyntheticEvent<EventTarget>) {
        let position = getPosition((event.nativeEvent.target as HTMLDivElement).id);

        let direction = (event.target as HTMLDivElement).className.split(' ')[2];

        if (direction === 'top') {
            dispatch(addWall({x: position[0], y: position[1], 'directions': 'bottom'}));

            if (position[0] == path.x && position[1] == path.x) {
                for (let i = position[1]; i <= 1; i--) {
                    dispatch(setPath([]));
                }
            }
        }

        if (direction === 'right') {
            dispatch(addWall({x: position[0] - 1, y: position[1], 'directions': direction}));
        }

        if (direction === 'left') {
            dispatch(addWall({x: position[0], y: position[1], 'directions': 'right'}));
        }

        if (direction === 'bottom') {
            dispatch(addWall({x: position[0], y: position[1] + 1, 'directions': 'bottom'}));
        }

        dispatch(setAnimation('animation-none'));
        dispatch(setOpponentGotWall(false));
        dispatch(setOpponentGotWall(true));
        dispatch(setShouldSpeak(false));
        dispatch(setMyTurn(false));
        dispatch(decrementMyWalls());
        dispatch(setTop([]));
        dispatch(setRight([]));
        dispatch(setBottom([]));
        dispatch(setLeft([]));

        if (Math.floor(Math.random() * (3 - 1) + 1) == 1) {
            dispatch(setRandomPhrase());
            dispatch(setShouldSpeak(true));
        }

        let noWalls;
        for (let i = opponentPosition.y; i >= 1; i--) {
            noWalls = true;
            for (let x = 0; x < walls.length; x++) {
                if (walls[x].x == opponentPosition.x && walls[x].y == opponentPosition.y && walls[x].directions.includes('bottom')) {
                    noWalls = false;
                }
            }

            if (noWalls) {
                dispatch(setPathWithoutWalls([opponentPosition.y, opponentPosition.x]));
            } else {
                for (let x = 0; x < walls.length; x++) {
                    if (walls[x].x == opponentPosition.x && walls[x].y == opponentPosition.y && walls[x].directions.includes('bottom')) {
                        noWalls = false;
                    }
                }
            }
        }
    }

    let position = 'field-' + x + '-' + y;

    if (countTop !== null && countTop[0] === x && countTop[1] === y) {
        return (
            <div id={position} className='arrows arrow top' onClick={handleClickArrows}></div>
        );
    }

    if (countRight !== null && countRight[0] === x && countRight[1] === y) {
        return (
            <div id={position} className='arrows arrow right' onClick={handleClickArrows}></div>
        );
    }

    if (countBottom !== null && countBottom[0] === x && countBottom[1] === y) {
        return (
            <div id={position} className='arrows arrow bottom' onClick={handleClickArrows}></div>
        );
    }

    if (countLeft !== null && countLeft[0] === x && countLeft[1] === y) {
        return (
            <div id={position} className='arrows arrow left' onClick={handleClickArrows}></div>
        );
    }

    let big = !moving ? ' myposition' : ' myposition-big';

    let image = !moving ? mario.src : mariomoving.src;

    if (myPosition.x === x && myPosition.y === y) {
        return (
            <div className={'inner-field' + big}>
                <img src={image}/>
            </div>
        );
    }

    let opponentBig = !opponentMoving ? ' opponent' : ' opponent-big';

    image = !opponentMoving ? luigi.src : luigimoving.src;

    if (opponentPosition.x === x && opponentPosition.y === y) {
        return (
            <div className={'inner-field' + opponentBig}>
                <img src={image}/>
            </div>
        );
    }

    return (
        <div id={position} className='inner-field' onClick={handleClickField}></div>
    );
}

export default InnerField;