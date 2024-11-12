export default function WallOnPosition(walls: any[], myPosition: object, direction: string) {
    for (let i = 0; i < walls.length; i++) {
        if (direction === 'left') {
            if (walls[i].x === myPosition.x - 1 && walls[i].y === myPosition.y && walls[i].directions.includes('right')) {
                return true;
            }
        } else if (direction === 'right') {
            if (walls[i].x === myPosition.x && walls[i].y === myPosition.y && walls[i].directions.includes('right')) {
                return true;
            }
        } else if (direction === 'up') {
            if (walls[i].x === myPosition.x && walls[i].y === myPosition.y + 1 && walls[i].directions.includes('bottom')) {
                return true;
            }
        } else if (direction === 'bottom') {
            if (walls[i].x === myPosition.x && walls[i].y === myPosition.y && walls[i].directions.includes('bottom')) {
                return true;
            }
        }
    }

    return false;
}