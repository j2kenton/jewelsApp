import React from 'react';
import inputSection from '../../hocs/inputSection';
import OptionItem from "../optionItem";
import utils from "../../utils/general";

const EMPTY_INPUT = "";

const ALL_OPTION = {
  label: "All Stone Types",
  value: "",
};

const InputSection = ({ ...props }) => {

  this.inputValue = props.input;
  if (typeof this.inputValue !== "string"){
    this.inputValue = EMPTY_INPUT;
  }

  this.stoneTypes = Object.keys(props.data).map((type) => ({
    label: type,
    value: type,
  }));

  this.stoneTypes.unshift(ALL_OPTION);
  let dataSet = {};
  if (props.stoneType){
    dataSet[props.stoneType] = props.data[props.stoneType];
  } else {
    dataSet = props.data;
  }

  this.optionsFlat = utils.generateOptions(dataSet, props.input);

  const renderOptionsElements = () => {
    if (!props.input || !Array.isArray(this.optionsFlat) || this.optionsFlat.length === 0){
      return null;
    }
    const optionsByLabel = new Set();
    let history = props.history;
    if (props.stoneType){
      history = history.filter((stoneOptions) => {
        return stoneOptions.parent === props.stoneType;
      });
    }
    const historyElements =  history.map(stoneOptions => {
      if (optionsByLabel.has(stoneOptions.label)){
        return null; // skip duplicates
      }
      optionsByLabel.add(stoneOptions.label);
      return (
        <OptionItem
          stoneOptions={stoneOptions}
          icon="history"
          onClick={() => this.optionClickHandler(stoneOptions)}
        />
      )
    });
    const optionsElements =  this.optionsFlat.map(stoneOptions => {
      if (!stoneOptions.label || optionsByLabel.has(stoneOptions.label)){ // skip invalid options or duplicates
        return null;
      }
      optionsByLabel.add(stoneOptions.label);
      return (
        <OptionItem
          stoneOptions={stoneOptions}
          icon="search"
          onClick={() => this.optionClickHandler(stoneOptions)}
        />
      )
    });
    const lineBreak = (<hr/>);
    return (
      <ul className="dropdownMenu">
        {historyElements}
        {lineBreak}
        {optionsElements}
      </ul>
    );
  };

  const renderStonesElements = () => {
    return this.stoneTypes.map((type, arrayIndex) => {
      return (
        <option value={type.value} key={`stone-type-${arrayIndex}`}>
          {type.label}
        </option>
      )
    });
  };

  this.inputChangeHandler = (e) => {
    const newInput = e.target.value;
    props.onChange(newInput);
  };

  this.stoneChangeHandler = (e) => {
    const newInput = e.target.value;
    props.onTypeChange(newInput);
  };

  this.optionClickHandler = (stoneOptions) => {
    props.onSelection(stoneOptions);
  };

  return (
    <div className="row" id="inputSection">
      <form className="form-inline">
        <select
          onChange={this.stoneChangeHandler}
        >
          { renderStonesElements() }
        </select>
        <div className="form-group">
          <input
            value={this.inputValue}
            onChange={this.inputChangeHandler}
          />
            { renderOptionsElements() }
        </div>
      </form>
    </div>
  );
};

export default inputSection(InputSection);
