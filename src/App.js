import React, { Component } from 'react';
import InputSection from './components/inputSection';
import ErrorSection from './components/errorSection';
import Stones from './components/stones';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import utils from "./utils/general";

const API = "./";
const DEFAULT_QUERY = "stones.json";

const INVALID_TIME_MSG = "Tickets only available between 9 a.m. and 7 p.m. Please come back later.";
const HAS_TICKET_MSG = "Sorry. You already hold a valid ticket. You'll have to wait.";
const INVALID_INPUT_MSG = "Please check the input and try again.";
const INVALID_SELECTION_MSG = "Please select a stone.";

class StoneApp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      selection: {},
      input: "",
      data: [],
      dataStructured: {},
    };
  }

  getData = async () => {
    try {
      const url = API + DEFAULT_QUERY;
      const response = await axios.get(url);

      let dataStructured = {};
      response.data.forEach((element) => {
        if (!dataStructured[element.type]){
          dataStructured[element.type] = [];
        }
        const shape = {
          property: "shape",
          value: element.shape,
        };
        dataStructured[element.type].push(shape);
        const clarity = {
          property: "clarity",
          value: element.clarity,
        };
        dataStructured[element.type].push(clarity);
        if (typeof element.color === "string"){
          const color = {
            property: "color",
            value: element.color,
          };
          dataStructured[element.type].push(color);
        }
      });


      this.setState({
        data: response.data,
        dataStructured: dataStructured,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadInput();
    this.getData();
  }

  storeInput = (input) => {
    localStorage.setItem("input", input);
  };

  loadInput = () => {
    const input = localStorage.getItem("input");
    this.setState({ input: input });
  };

  checkInputValid = () => {
    let isInputValid = true;
    let errorMsg = "";
    if (!utils.isTimeValid()){
      isInputValid = false;
      errorMsg = INVALID_TIME_MSG;
    } else if (!this.isUserWithoutTicket(this.state.input)){
      isInputValid = false;
      errorMsg = HAS_TICKET_MSG;
    } else if (!utils.isInputValid(this.state.input)){
      isInputValid = false;
      errorMsg = INVALID_INPUT_MSG;
    } else if (!utils.isSelectionValid(this.state.selection, this.state.data)){
      isInputValid = false;
      errorMsg = INVALID_SELECTION_MSG;
    }
    return {isInputValid, errorMsg};
  };

  selectionCallback = (newSelection) => {
      this.setState({
        selection: newSelection,
        input: newSelection.label,
      });
  };

  inputChangeCallback = (newInput) => {
    this.setState({
      input: newInput,
    });
  };

  submissionCallback = () => {
    const inputStatus = this.checkInputValid();
    if (!inputStatus.isInputValid){
      return;
    }
    this.storeInput(this.state.input);
    // this.bookStone(this.state.input, this.state.selection)
    //   .catch(error => console.log(error));
  };

  render() {
    if (!this.state.isLoading && Array.isArray(this.state.data) && (this.state.data.length > 0)) {
      const inputStatus = this.checkInputValid();
      return (
        <div className="container">
          <h1>Rapaport Stone Search</h1>
          <InputSection
            data={this.state.dataStructured}
            input={this.state.input}
            onChange={this.inputChangeCallback}
            onSelection={this.selectionCallback}
            submissionHandler={this.submissionCallback}
            timestamp={this.state.timestamp}
            isInputValid={inputStatus.isInputValid}
          />
          <ErrorSection
            errorMsg={inputStatus.errorMsg}
          />
          <Stones
            data={this.state.data}
            selection={this.state.selection}
            onChange={this.selectionCallback}
          />
        </div>
      )
    } else {
      return null;
    }
  }
}

export default function App() {
  return (
    <div id="wrapper">
      <StoneApp/>
    </div>
  )
}
