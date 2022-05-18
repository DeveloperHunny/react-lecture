import React, { Component } from "react";
import Try from "./Try";

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseBall extends Component{

    state = {
        result : '',
        value : '',
        answer : getNumbers(),
        tries : [],
    }

    onSubmitForm = (e) => {
        const { result, value, answer, tries } = this.state;
        e.preventDefault();
        if(this.state.value === answer.join('')){ //정답일 경우
            this.setState({
                result : "정답입니다! 홈런~",
                value : '',
                tries: [...tries, {try : value, result : '홈런!'}],
            });
            alert("다시 게임을 시작하겠습니다.")
            this.setState({ //게임 다시 셋팅하기
                value : ' ',
                answer : getNumbers(),
                tries : []
            });
        }
        else{ //정답이 아닐 경우
            if(tries.length >= 9){ //10번 이상 틀렸을 때
                this.setState({
                    result : `10번 이상 틀리셨습니다. 정답은 ${answer}이였습니다.`,
                });
                alert("게임을 다시 시작합니다!");
                this.setState({ //게임 다시 셋팅하기
                    value : ' ',
                    answer : getNumbers(),
                    tries : []
                });
            }
            else{ //아직 시도 기회가 남았을 경우
                let strike = 0;
                let ball = 0;
                const inputAnswer = value.split('').map((v) => parseInt(v));
                // STRIKE BALL 계산
                for(let i = 0 ; i < 4; i++){
                    if(inputAnswer[i] === answer[i]){ strike += 1;}
                    else if(answer.includes(inputAnswer[i])){ ball += 1;}
                    this.setState({
                        tries : [...tries ,
                            { try : value , result : `STRIKE : ${strike}  BALL : ${ball}`}],
                        value : '',
                    });
                }
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({ value : e.target.value })
    }

    render() {
        const {result, value, tries} = this.state;
        return(
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={value} onChange={this.onChangeInput}/>
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


}


export default NumberBaseBall;