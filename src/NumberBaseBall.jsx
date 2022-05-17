import React, { Component } from "react";

function getNumbers(){
    let number = '';
    for(let i = 0; i < 4; i++){
        let num = Math.floor(Math.random() * 9 +1);
        number += num.toString();
    }

    return number;
}

class NumberBaseBall extends Component{

    constructor(props) {
        super(props);
        this.state = {
            result : '',
            value : '',
            answer : getNumbers(),
            tries : [],
        };

        console.log(this.state.answer);
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if(Number(this.state.value) === this.state.answer){
            this.setState({
                result : "정답입니다!",
                value : '',
            });
        }
        else{
            // STRIKE BALL 계산
            let ans = this.state.answer;
            let inp = this.state.value;
            let strike = 0;
            let ball = 0;
            for(let i = 0; i < 4; i++){
                if(ans[i] === inp[i]){
                    strike += 1;
                }
                else if (ans.indexOf(inp)){
                    ball += 1;
                }
            }
            this.setState({
                result : {strike} + 'STRIKE   ' + {ball} + 'BALL',
                value : '',
                tires : this.state.tries.concat(this.state.value),
            })
        }
    }

    onChangeInput = (e) => {
        this.setState({ value : e.target.value })
        console.log(this.state.value);
    }

    render() {
        return(
          <>
              <h1>{this.state.result}</h1>
              <form onSubmit={this.onSubmitForm}>
                  <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                  <button type="submit"> 입력 </button>
              </form>
              <div>시도 횟수 : {this.state.tries.length}</div>
              <ul>
                  {this.state.tries.map((item) => <li> {item} </li>)}
              </ul>
              <br/>


          </>
        );
    }


}


export default NumberBaseBall;