import React, { Component, memo } from "react";

const Record = memo(({time, order}) => {
    return(
        <li>
            {order}번째 : {time}
        </li>
    );
});

class ResponseCheck extends Component{

    state = {
        state : 'waiting',
        message : '클릭해서 시작하세요.',
        result : [],
    };

    timeoutID;
    startTime;
    endTime;
    onClickScreen = () =>{
        console.log(this.state.result);
        const { state, message, result } = this.state;
        if(state === 'waiting'){

            //state 설정
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',});
            //시간 측정
            this.timeoutID = setTimeout(() => {
                    this.setState({
                        state: 'now',
                        message: '지금 클릭하세요.',
                    }); this.startTime = new Date();},
                Math.floor(Math.random() * 1000) + 2000); // 2초~3초 후에 초록색으로
        }
        else if(state === 'ready'){ //너무 빨리 클릭
            this.setState({
                state: 'waiting',
                message: '너무 빨리 눌렀습니다. 초록색이 되면 클릭하세요.',
            });
            clearTimeout(this.timeoutID);

        }
        else if(state === 'now'){ //반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return({
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                });
            })
        }



    };

    renderAverage = () => {
        const { state, message, result } = this.state;
        return(this.state.result.length !== 0 &&
            <div>평균시간 : {this.state.result.reduce((a,c) => a + c) / this.state.result.length}msc</div>);
    }

    onReset = () => {
        const { state, message, result } = this.state;
        this.setState({
            state: 'waiting',
            message: '클릭해서 시작하세요.',
            result: [],
        });
    }

    render(){
        const { state, message, result } = this.state;
        return(
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
                <button onClick={this.onReset}>Reset</button>
                <ul>
                    {this.state.result.map((time,index) => {
                        return(
                            <Record key={`${index}차`} time={time} order={index+1}/>
                        )
                    })}

                </ul>
            </>
        );



    }
}