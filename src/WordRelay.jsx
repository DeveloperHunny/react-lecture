const React = require('react');

class WordRelay extends React.Component{

    state = {
        word : '끝말잇기',
        value : 'EMPTY',
        result : 'EMPTY',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state.word[-1]);
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                result : '딩동댕',
                word : this.state.value,
                value : '',
            });
            this.inputRef.focus();
        }   
        else{
            this.setState({
                result : '땡',
                value : '',
            })
        }
        
    }

    onChangeInput = (e) => {
        this.setState({
            value : e.target.value,
        })
    }

    inputRef;
    onRefInput = (c) => {
        this.inputRef = c;
    }



    render(){
        return(
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }

}


module.exports = WordRelay;