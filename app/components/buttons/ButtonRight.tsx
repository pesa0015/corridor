import { selectMyPosition, selectMyTurn, moveRight } from "@/lib/features/position/positionSlice";
import { selectWalls } from "@/lib/features/walls/wallsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import WallOnPosition from './../wallOnPosition/WallOnPosition';
import right from './../../../public/right.png';
import rightGreen from './../../../public/right-green.png';

export default function ButtonRight() {
    const dispatch = useAppDispatch();
    const myPosition = useAppSelector(selectMyPosition);
    const myTurn = useAppSelector(selectMyTurn);
    const walls = useAppSelector(selectWalls);

    function handleClickRight() {
        dispatch(moveRight());
    }

    if (WallOnPosition(walls, myPosition, 'right') || myPosition.x == 20 || !myTurn) {
        return <img src={right.src} className="move-btn-disabled"/>;
    }

    return <img src={rightGreen.src} className="move-btn" onClick={handleClickRight}/>;
}