import React, { Component } from 'react';
import InputSection from './components/inputSection';
import Stones from './components/stones';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import utils from "./utils/general";

const API = "./";
const DEFAULT_QUERY = "stones.json";

class StoneApp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      selection: {},
      input: "",
      stoneType: "",
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

  typeChangeCallback = (newInput) => {
    this.setState({
      stoneType: newInput,
    });
  };

  submissionCallback = () => {
    this.storeInput(this.state.input);
    // this.bookStone(this.state.input, this.state.selection)
    //   .catch(error => console.log(error));
  };

  render() {
    if (!this.state.isLoading && Array.isArray(this.state.data) && (this.state.data.length > 0)) {
      return (
        <div className="container">
          <h1>Rapaport Stone Search</h1>
          <InputSection
            data={this.state.dataStructured}
            input={this.state.input}
            stoneType={this.state.stoneType}
            onChange={this.inputChangeCallback}
            onTypeChange={this.typeChangeCallback}
            onSelection={this.selectionCallback}
            submissionHandler={this.submissionCallback}
            timestamp={this.state.timestamp}
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
