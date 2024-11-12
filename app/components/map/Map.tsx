import { useState, useEffect } from 'react';
import Field from './../field/Field';

const Home = ({walls} : {walls: any[]}) => {
    const [y] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    const [x] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    return (
        <div id="map">
            {[...y].reverse().map((yItem) =>
                <div key={yItem} className="row"><div className="y">{yItem}</div>
                    <div className="x">
                    {[...x].map((xItem) => {
                        let key = yItem + xItem + Math.random();
                        
                        return <Field
                            key={key}
                            walls={walls}
                            x={xItem}
                            y={yItem}/>
                        }
                    )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;