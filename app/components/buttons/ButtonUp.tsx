import { selectMyPosition, selectMyTurn, moveUp } from "@/lib/features/position/positionSlice";
import { selectWalls } from "@/lib/features/walls/wallsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import WallOnPosition from './../wallOnPosition/WallOnPosition';
import up from './../../../public/up.png';
import upBlue from './../../../public/up-blue.png';

export default function ButtonUp() {
    const dispatch = useAppDispatch();
    const myPosition = useAppSelector(selectMyPosition);
    const myTurn = useAppSelector(selectMyTurn);
    const walls = useAppSelector(selectWalls);

    function handleClickUp() {
        dispatch(moveUp());
    }

    if (WallOnPosition(walls, myPosition, 'up') || myPosition.y == 20 || !myTurn) {
        return <img src={up.src} id="up" className="move-btn-disabled"/>;
    }

    return <img src={upBlue.src} id="up" className="move-btn" onClick={handleClickUp}/>;
}