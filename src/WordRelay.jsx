const React = require('react');

class WordRelay extends React.Component{

    state = {
        text : "Hello, webpack",
    };

    render(){
        return(
            <div>
                <h1>{this.state.text}</h1>
            </div>
        );
    }

}


module.exports = WordRelay;