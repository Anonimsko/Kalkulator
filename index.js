import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let history1 = new Array();
let history2 = new Array();
let history3 = new Array();
let history4 = new Array();
let buttons = new Array();

let dataArray = ["0.621371192", "Kilometry na mile", "1.609344", "Mile na kilometry", "2.20462262", "Kilogramy na funty", "0.45359237", "Funty na kilogramy"];
let index = -1;
let historyDiv;

class Calculator extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {result: null, multiplier: null, inputValue: "", change: null};
    
    this.handleChange = this.handleChange.bind(this);
    this.changeMultiplier = this.changeMultiplier.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(event) 
  {
    this.setState({inputValue: event.target.value});
  }

  changeMultiplier(e)
  {
    let arrayIdx = dataArray.indexOf(e.target.value);

    this.setState({change: dataArray[arrayIdx+1]});
    this.setState({multiplier: e.target.value});
  }

  calculate() 
  {
    index++;
    let temp = this.state.inputValue * this.state.multiplier;
    history1[index] = this.state.inputValue;
    history2[index] = this.state.multiplier;
    history3[index] = this.state.change;
    history4[index] = temp;
    this.setState({result: history4[index]});

    for(let i = 0; i < history1.length; i++)
    {
      buttons[i] = history3[i] + " | " + history1[i] + " * " + history2[i] + " = " + history4[i];
    }

    historyDiv =
      buttons.map((val, idx) => {
        return (
          <button value={idx} key={idx} onClick={e => this.showHistory(e, "value")}>{val}</button>
        );
      });
  }

  showHistory(e)
  {
    this.setState({inputValue: history1[e.target.value]});
    this.setState({multiplier: history2[e.target.value]});
    this.setState({change: history3[e.target.value]});
    this.setState({result: history4[e.target.value]});
  }

  render() {
    return (
      <div>
        <button value={0.621371192} onClick={e => this.changeMultiplier(e, "value")}>Kilometry na mile</button>
        <button value={1.609344} onClick={e => this.changeMultiplier(e, "value")}>Mile na kilometry</button>
        <button value={2.20462262} onClick={e => this.changeMultiplier(e, "value")}>Kilogramy na funty</button>
        <button value={0.45359237} onClick={e => this.changeMultiplier(e, "value")}>Funty na kilogramy</button>
        <h2>Zamiana: {this.state.change}</h2>
        <input type="number" value={this.state.inputValue} onChange={this.handleChange} />
        <h2>Wynik: {this.state.result}</h2>
        <button onClick={this.calculate}>Przelicz</button>
        <h2>Historia</h2>
        {historyDiv}
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);



reportWebVitals();
