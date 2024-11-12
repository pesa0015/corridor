import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectShouldSpeak, selectRandomPhrase, selectAnimation, setAnimation } from "@/lib/features/walls/wallsSlice";

export default function Phrase() {
    const dispatch = useAppDispatch();
    const shouldSpeak = useAppSelector(selectShouldSpeak);
    const randomPhrase = useAppSelector(selectRandomPhrase);
    const animation = useAppSelector(selectAnimation);

    useEffect(() => {
        if (shouldSpeak) {
            setTimeout(() => {
                dispatch(setAnimation('animation'));
            }, 1000);
        }
    });

    return (
        <div id="phrases" className={animation}>
            {shouldSpeak && animation === 'animation' ? (<h3>{randomPhrase}</h3>) : null}
        </div>
    );
}