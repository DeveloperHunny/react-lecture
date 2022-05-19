import React, {useState, useRef, useEffect, useMemo, useCallback} from "react";
import Ball from "../numberBaseBall/Ball";

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNUmbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNUmbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); //
    const [ winNumbers, setWinNumbers ] = useState(lottoNumbers);
    const [ winBalls, setWinBalls ] = useState([]);
    const [ bonus, setBonus ] = useState(null);
    const [ redo, setRedo ] = useState(false);
    
    const timeoutIDs = useRef([]);

    const runTimeouts = () => {
        for(let i = 0; i < winNumbers.length -1; i++){
            timeoutIDs.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => {
                    return [...prevBalls , winNumbers[i]];
                });
            }, (i+1) * 500);
        }

        timeoutIDs.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 3500);
    }

    useEffect(() => { //처음 랜더링때만 실행
        console.log("Use Effect");
        runTimeouts();
        return () => {timeoutIDs.current.forEach((v) => {
            clearTimeout(v);
        });}
    },[timeoutIDs.current]);

    const onClickRedo = useCallback(() => {

        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeoutIDs.current = [];
    }, []);

    
    return(
        <>
            <div>당첨숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스 숫자</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}> Restart! </button>}

        </>

    );
    
}

export default Lotto;