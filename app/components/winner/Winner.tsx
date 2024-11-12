const Winner = ({myPosition} : {myPosition: object}) => {
    if (myPosition.y == 20) {
        return (
            <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>
        );
    }

    return null;
}

export default Winner;