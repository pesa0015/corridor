import { selectMyPosition, selectMyTurn, moveLeft } from "@/lib/features/position/positionSlice";
import { selectWalls } from "@/lib/features/walls/wallsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import WallOnPosition from './../wallOnPosition/WallOnPosition';
import left from './../../../public/left.png';
import leftPurple from './../../../public/left-purple.png';

export default function ButtonLeft() {
    const dispatch = useAppDispatch();
    const myPosition = useAppSelector(selectMyPosition);
    const myTurn = useAppSelector(selectMyTurn);
    const walls = useAppSelector(selectWalls);

    function handleClickLeft() {
        dispatch(moveLeft());
    }

    if (WallOnPosition(walls, myPosition, 'left') || myPosition.x == 1 || !myTurn) {
        return <img src={left.src} id="left" className="move-btn-disabled"/>;
    }

    return <img src={leftPurple.src} id="left" className="move-btn" onClick={handleClickLeft}/>;
}