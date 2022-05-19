import React, { Component } from "react";

//class의 경우 => constructor 부분 -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> ShouldComponentUpdate(true 경우) -> render -> componentDidUpdate
// 부모에서 해당 컴포넌트가 제거될 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px'
}

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v){
        return v[1] === imgCoord;
    })[0];
}

class RSP extends Component{

    state = {
        result : '',
        score : 0,
        imgCoord: '0',
    };

    intervalID;

    //컴포넌트 LifeCycle
    componentDidMount() { //컴포넌트가 처음 랜더링이 되어서 DOM 붙을 때 실행되는 함수 -> 여기에 비동기 요청을 많이 함.
        this.intervalID = setInterval(this.changeImg, 100);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {//컴포넌트가 리랜더링 될 때

    }

    componentWillUnmount() { //컴포넌트가 제거되기 직전
        clearInterval(this.intervalID);
    }

    changeImg = ()=>{
        const { imgCoord } = this.state;
        if(imgCoord === rspCoords.바위){
            this.setState({ imgCoord: rspCoords.가위} );
        }
        else if(imgCoord === rspCoords.가위){
            this.setState({ imgCoord: rspCoords.보} );
        }
        else if(imgCoord === rspCoords.보){
            this.setState({ imgCoord: rspCoords.바위} );
        }
    }

    onClickBtn = (choice) => () => {
        const{ imgCoord } = this.state;
        clearInterval(this.intervalID);
        const myChoice = scores[choice];
        const comChoice = scores[computerChoice(imgCoord)];
        const diff = myChoice - comChoice;
        if(diff === 0){
            this.setState({
                result : '비겼습니다. +0점'
            });
        }
        else if([-1,2].includes(diff)){
            this.setState((prevState) => {
                return {
                    result : '이겼습니다 +1점',
                    score : prevState.score +1,
                }
            });
        }
        else{
            this.setState((prevState) => {
                return {
                    result : '졌습니다. -1점',
                    score : prevState.score - 1,
                }
            });
        }
        setTimeout(() => {
            this.intervalID = setInterval(this.changeImg, 100);
        },1000);

    }

    render() {
        const { result, score, imgCoord } = this.state;

        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>

        );
    }
}