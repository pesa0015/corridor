import InnerField from './../innerField/InnerField'
import RightWall from './../rightWall/RightWall';
import BottomWall from './../bottomWall/BottomWall';

const Field = ({walls, x, y} : {walls: any[], x: number, y: number}) => {
    return (
        <div className="field">
            <InnerField
                x={x}
                y={y}/>
            <RightWall walls={walls} x={x} y={y}/>
            <BottomWall walls={walls} x={x} y={y}/>
        </div>
    );
}

export default Field;