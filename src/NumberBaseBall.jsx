import React, {Component} from "react";
import Try from "./Try";

const {useState, useRef} = React;

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseBall = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const InputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){ //정답일 경우
            setResult("정답입니다! 홈런~");
            setTries((prevState) => [...prevState, {try : value, result : '홈런!'}]);


            alert("다시 게임을 시작하겠습니다.")
            //게임 다시 셋팅하기
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        }
        else{ //정답이 아닐 경우
            if(tries.length >= 9){ //10번 이상 틀렸을 때
                setResult(`10번 이상 틀리셨습니다. 정답은 ${answer}이였습니다.`);
                alert("게임을 다시 시작합니다!");
                //게임 다시 셋팅하기
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }
            else{ //아직 시도 기회가 남았을 경우
                let strike = 0;
                let ball = 0;
                const inputAnswer = value.split('').map((v) => parseInt(v));
                // STRIKE BALL 계산
                for(let i = 0 ; i < 4; i++){
                    if(inputAnswer[i] === answer[i]){ strike += 1;}
                    else if(answer.includes(inputAnswer[i])){ ball += 1;}
                }
                setTries((prevState) => [...prevState , { try : value , result : `STRIKE : ${strike}  BALL : ${ball}`}]);
                setValue('');
            }
        }

        InputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return(
      <>
          <h1>{result}</h1>
          <form onSubmit={onSubmitForm}>
              <input ref={InputRef} maxLength={4} value={value} onChange={onChangeInput}/>
              <button type="submit"> 입력 </button>
          </form>
          <div>시도 횟수 : {tries.length}</div>
          <ul>
              {tries.map((v,i) => <Try key={`${i + 1}차 시도 : `} tryInfo={v}/>)}
          </ul>
          <br/>
      </>
    );


}


export default NumberBaseBall;