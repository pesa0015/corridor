const RightWall = ({walls, x, y} : {walls: any[], x: number, y: number}) => {
    let className = 'wall-right';
    for (let i = 0; i < walls.length; i++) {
        if (x === walls[i].x && y === walls[i].y && walls[i].directions.includes('right')) {
            className += ' wall-filled';
        } else if (typeof walls[i + 1] !== 'undefined' && x + 1 === walls[i + 1].x && y === walls[i].y && walls[i].directions.includes('left')) {
            className += ' wall-filled';
        }
    }

    return <div className={className}></div>;
}

export default RightWall;