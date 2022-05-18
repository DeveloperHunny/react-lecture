import React, { Component } from "react";

//class의 경우 => constructor 부분 -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> ShouldComponentUpdate(true 경우) -> render -> componentDidUpdate
// 부모에서 해당 컴포넌트가 제거될 때 -> componentWillUnmount -> 소멸


class RSP extends Component{

    state = {
        result : '',
        score : 0,
        imgCoord: 0,
    };


    //컴포넌트 LifeCycle
    componentDidMount() { //컴포넌트가 처음 랜더링이 되어서 DOM 붙을 때 실행되는 함수

    }

    componentDidUpdate(prevProps, prevState, snapshot) {//컴포넌트가 리랜더링 될 때

    }

    componentWillUnmount() { //컴포넌트가 제거되기 직전

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

export default RSP;