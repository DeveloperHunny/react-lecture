import React, { Component, memo } from "react";
const { useState, useRef } = React;

const Record = memo(({time, order}) => {
    return(
        <li>
            {order}번째 : {time}
        </li>
    );
});

const ResponseCheck = memo(() =>{

    const [state, setState ] = useState('waiting');
    const [message , setMessage]  = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    const timeoutID = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () =>{

        if(state === 'waiting'){
            //state 설정
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            
            //시간 측정
            timeoutID.current = setTimeout(() => {
                    setState('now');
                    setMessage('지금 클릭하세요.');
                    startTime.current = new Date();},
                Math.floor(Math.random() * 1000) + 2000); // 2초~3초 후에 초록색으로
        }
        else if(state === 'ready'){ //너무 빨리 클릭
            setState('waiting');
            setMessage('너무 빨리 눌렀습니다. 초록색이 되면 클릭하세요.');
            clearTimeout(timeoutID.current);
        }
        else if(state === 'now'){ //반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
        }



    };

    const renderAverage = () => {
        return(result.length !== 0 &&
            <div>평균시간 : {result.reduce((a,c) => a + c) / result.length}msc</div>);
    }

    const onReset = () => {
        setState('waiting');
        setMessage('클릭해서 시작하세요.');
        setResult([]);
    }

    return(
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
            <button onClick={onReset}>Reset</button>
            <ul>
                {result.map((time,index) => <Record key={`${index}차`} time={time} order={index+1}/>)}
            </ul>
        </>
    );




});

export default ResponseCheck;