const BottomWall = ({walls, x, y} : {walls: any[], x: number, y: number}) => {
    let className = 'wall-bottom';
    for (let i = 0; i < walls.length; i++) {
        if (x === walls[i].x && y === walls[i].y && walls[i].directions.includes('bottom')) {
            className += ' wall-bottom-filled wall-filled';
        } else if (x === walls[i].x && y - 1 === walls[i].y && walls[i].directions.includes('top')) {
            className += ' wall-bottom-filled wall-filled';
        }
    }

    return <div className={className}></div>;
}

export default BottomWall;