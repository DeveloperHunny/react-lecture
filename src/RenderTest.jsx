import React, { PureComponent} from "react";

class Test extends PureComponent{

    state = {
        counter : 0,
        str : 'Hello',
        num : 1,
        boolVar : true,
        arr : [],
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter){ return true; }
    //
    //
    //     return false;
    // }

    onClick = () => {
        this.setState({
            arr : []
        });
    }

    render(){
        this.state.counter += 1;
        console.log("랜더링", this.state.counter);
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test;