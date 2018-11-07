import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '0',       // 4 + 5 / 3 - 2 * 5
            result: null,
            display: null
        }
    }

    handleClick = (event) => {
        debugger;
        console.log(this.state, "handleclick");
        if(this.state.value.length === 0 && event.target.innerText === '0') {
            return;
            }

        if(this.state.value === '0') {
            this.setState({
                value: event.target.innerText,
                secondValue: event.target.innerText,
                display: this.state.operator
                    ? this.state.firstValue + ' ' + this.state.operator + ' ' + event.target.innerText
                    : event.target.innerText,
            });
        }

        else if(this.state.result === this.state.value) {
            this.setState({
                value: event.target.innerText,
                display: this.state.result + ' ' + this.state.operator + ' ' + event.target.innerText
            })
        }

        else if(this.state.clearScreenOnNextClick) {
            this.setState({
                value: event.target.innerText,
                secondValue: event.target.innerText,
                display: this.state.value + ' ' + this.state.operator + ' ' + event.target.innerText,
                clearScreenOnNextClick: false
            })
        }

        else if(this.state.operator) {
            this.setState({
                secondValue: this.state.value + event.target.innerText,
                display: this.state.display + event.target.innerText
            })
        }

        else {
            this.setState({
                value: this.state.value + event.target.innerText,
                display: this.state.value + event.target.innerText
            });
        }

    };


    pointClick = (event) => {
        console.log(this.state);
        if(this.state.value.indexOf('.') === -1) {
            this.setState({
                value: this.state.value + '.',
                display: this.state.display + '.',
            })
        }
    };

    plusClick = (event) => {
        this.setState({
            firstValue: this.state.value,
            secondValue: this.state.value + event.target.innerText,
            operator: '+',
            clearScreenOnNextClick: true,
            display: this.state.value + ' + '
        });
    };

    minusClick = () => {
        this.setState({
            firstValue: this.state.value,
            operator: '-',
            clearScreenOnNextClick: true,
            display: this.state.value + ' - '
        });
    };

    multiplyClick = () => {
        this.setState({
            firstValue: this.state.value,
            operator: 'x',
            clearScreenOnNextClick: true,
            display: this.state.value + ' x '
        });
    };

    divideClick = () => {
        this.setState({
            firstValue: this.state.value,
            operator: '÷',
            clearScreenOnNextClick: true,
            display: this.state.value + ' ÷ '
        });
    };

    equalClick = () => {
        if(this.state.operator === '+' && !this.state.result) {
            console.log(this.state);
            console.log(this.state.firstValue);
            console.log(this.state.secondValue);
            console.log(this.state.operator);
            this.state.result = parseFloat(this.state.firstValue) + parseFloat(this.state.secondValue);
            this.setState({
                value: this.state.result
            })
        }

        else if(this.state.operator === '-' && !this.state.result) {
            this.state.result = parseFloat(this.state.firstValue) - parseFloat(this.state.secondValue);
            this.setState({
                value: this.state.result
            })
        }
        else if(this.state.operator === '÷' && !this.state.result) {
            this.state.result = parseFloat(this.state.firstValue) / parseFloat(this.state.secondValue);
            this.setState({
                value: this.state.result
            })
        }
        else if(this.state.operator === 'x' && !this.state.result) {
            this.state.result = parseFloat(this.state.firstValue) * parseFloat(this.state.secondValue);
            this.setState({
                value: this.state.result
            })
        }

     };

    getFormatResult = inputString =>{
        if(!inputString || inputString.length <= 3) {
            return this.state.result;
        }

        let decimalValue = "";
        let value = inputString;
        if (value.indexOf('.') >= 0) {
            let splitValue = value.split('.'); // 234.77
            value = splitValue[0]; // 234
            decimalValue = "." + splitValue[1]; // .77
        }

        let stringArray = value.split('');
        let elementsAdded = 0;
        let loopCount = parseInt((value.length -1 )/ 3);

        for(let i = 1; i <= loopCount ; i++) {
            stringArray.splice(stringArray.length-((i * 3) + elementsAdded ), 0, ',');
            elementsAdded++;
        }

        stringArray = stringArray.join('') + decimalValue;
        return stringArray;
    };


    handleClear = () => {
        this.setState({
            value: '0',
            result: null,
            operator: null,
            firstValue: null,
            display: null
        })
    };


  render() {

      return (
      <div className="app">

          <div className={'resultScreen'}>
              {this.getFormatResult(this.state.result && this.state.result.toString())}
          </div>

          <div id={'calculation-display'} className={'calculationScreen'}>
              {this.state.display}
          </div>

          <div className='button-holder'>
              <div className='button' onClick={this.handleClick}>7</div>
              <div className='button' onClick={this.handleClick}>8</div>
              <div className='button' onClick={this.handleClick}>9</div>

              <div className='button' id={'operator'} onClick={this.divideClick}>÷</div>

              <div className='button' onClick={this.handleClick}>4</div>
              <div className='button' onClick={this.handleClick}>5</div>
              <div className='button' onClick={this.handleClick}>6</div>

              <div className='button' id={'operator'} onClick={this.multiplyClick}>x</div>

              <div className='button' onClick={this.handleClick}>1</div>
              <div className='button' onClick={this.handleClick}>2</div>
              <div className='button' onClick={this.handleClick}>3</div>

              <div className='button' id={'operator'} onClick={this.minusClick}>_</div>

              <div className='button' onClick={this.pointClick}>.</div>

              <div className='button' onClick={this.handleClick}>0</div>
              <div className='button' onClick={this.handleClear}>C</div>

              <div className='button' id={'operator'} onClick={this.plusClick}>+</div>

              <div className='equalButton' id={'operator'} onClick={this.equalClick}>=</div>

          </div>

      </div>
    );
  }
}

export default App;
