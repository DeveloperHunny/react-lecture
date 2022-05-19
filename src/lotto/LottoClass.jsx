import React, { Component, useState, useRef } from "react";
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

class LottoClass extends Component{

    state = {
        winNumbers: getWinNumbers(), //당첨 숫자들
        winBalls : [],
        bonus : null, //보너스 공
        redo : false,
    }

    timeoutIDs = [];

    runTimeouts = () => {
        const { winNumbers, winBalls, bonus } = this.state;
        for(let i = 0; i < winNumbers.length -1; i++){
            this.timeoutIDs[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls : [...prevState.winBalls , winNumbers[i]],
                    }
                })
            }, (i+1) * 1000);
        }

        this.timeoutIDs[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo : true,
            });
        }, 7000);
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.winBalls.length === 0){
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeoutIDs.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), //당첨 숫자들
            winBalls : [],
            bonus : null, //보너스 공
            redo : false,
        });
        this.timeoutIDs = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return(
            <>
                <div>당첨숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스 숫자</div>
                {bonus && <Ball number={bonus}/>}
                {redo && <button onClick={this.onClickRedo}> Restart! </button>}

            </>

        );
    }
}