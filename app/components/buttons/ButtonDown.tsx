import { selectMyPosition, selectMyTurn, moveUp } from "@/lib/features/position/positionSlice";
import { selectWalls } from "@/lib/features/walls/wallsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import WallOnPosition from './../wallOnPosition/WallOnPosition';
import down from './../../../public/down.png';
import downPink from './../../../public/down-pink.png';

export default function ButtonDown() {
    const dispatch = useAppDispatch();
    const myPosition = useAppSelector(selectMyPosition);
    const myTurn = useAppSelector(selectMyTurn);
    const walls = useAppSelector(selectWalls);

    function handleClickDown() {
        dispatch(moveDown());
    }

    if (WallOnPosition(walls, myPosition, 'down') || myPosition.y == 1 || !myTurn) {
        return <img src={down.src} id="down" className="move-btn-disabled"/>;
    }

    return <img src={downPink.src} id="down" className="move-btn" onClick={handleClickDown}/>;
}