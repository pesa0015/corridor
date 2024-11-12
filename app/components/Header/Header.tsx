import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Phrase from './../phrase/Phrase';
import mario from './../../../public/mario.png';
import luigi from './../../../public/luigi.png';
import logo from './../../../public/logo.png';
import wall from './../../../public/wall.png';
import { selectMyWalls, selectOpponentWalls, selectShouldSpeak, selectRandomPhrase } from "@/lib/features/walls/wallsSlice";

const Header = ({speak} : {speak: boolean}) => {
    // const [previousPhrase, setPreviousPhrase] = useState('');
    // const [randomPhrase, setRandomPhrase] = useState('');
    const countMyWalls = useAppSelector(selectMyWalls);
    const countOpponentWalls = useAppSelector(selectOpponentWalls);
    const shouldSpeak = useAppSelector(selectShouldSpeak);
    const randomPhrase = useAppSelector(selectRandomPhrase);

    // setRandomPhrase('test');
    // console.log(randomPhrase);

    // useEffect(() => {
    //     // console.log(speak && Math.floor(Math.random() * (3 - 1) + 1) == 1);
    //     if (shouldSpeak) {
    //         // setPreviousPhrase(randomPhrase);
    //         // while (previousPhrase == randomPhrase) {
    //             // console.log(phrases[Math.floor(Math.random() * (7 - 1) + 1)], Math.floor(Math.random() * (7 - 1) + 1));
    //             setRandomPhrase(null);
    //             setRandomPhrase(phrases[Math.floor(Math.random() * (7 - 1) + 1)]);
    //             // phrases[Math.floor(Math.random() * (7 - 1) + 1)]
    //             // console.log(randomPhrase);
    //         // }
    //     }
    // });
// {shouldSpeak ? (<div id="phrases">
//                 <h3>{randomPhrase}</h3>
//             </div>) : null}

    return (
        <div id="header">
            <img src={mario.src} height="80" id="mario"/>
            <img src={logo.src} width="200" id="logo"/>
            <img src={luigi.src} height="80"/>
            <div id="walls">
                <span>{countMyWalls}</span>
                <img src={wall.src} width="40"/>
                <span>{countOpponentWalls}</span>
            </div>
            <Phrase/>
        </div>
    );
}

export default Header;