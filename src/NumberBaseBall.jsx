import React, { Component } from "react";

function getNumbers(){
    let number = '';
    for(let i = 0; i < 4; i++){
        let num = Math.floor(Math.random() * 10);
        number += num.toString();
    }

    return Number(number);
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
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer){
            this.setState({
                result : "정답입니다!",
                value : ' ',
            });
        }
        else{
            this.setState({
                result : "틀렸습니다!",
                value : ' ',
                tires : this.state.tries.concat(this.state.value),
            })
        }
    }

    onChangeInput = (e) => { this.setState({ value : e.target.value })}

    render() {
        return(
          <>
              <h1>{this.state.result}</h1>
              <form onSubmit={this.onSubmitForm}>
                  <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
              </form>
              <div>시도 횟수 : {this.state.tries.length}</div>
              <ul>
                  {this.state.tries.map((item) => <li> {item} </li>)}
              </ul>
          </>
        );
    }


}


export default NumberBaseBall;