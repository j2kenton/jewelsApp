import React from 'react';
import inputSection from '../../hocs/inputSection';
import RideItem from "../rideItem";

const InputSection = ({ ...props }) => {

  this.inputValue = props.input || "";

  const stoneTypes = Object.keys(props.data);
  const chosenType = "";
  let dataSet = {};
  if (chosenType){
    dataSet[chosenType] = props.data[chosenType];
  } else {
    dataSet = props.data;
  }

  this.inputChangeHandler = (e) => {
    const newInput = e.target.value;
    props.onChange(newInput);
  };

  this.optionClickHandler = (stoneOptions) => {
    props.onSelection(stoneOptions);
  };


  let listOptions = Object.entries(dataSet).map(entry => {
    const optionKey = entry[0];
    const optionValue = entry[1];
    const stoneOptions = optionValue.map(optionSingle => {
      return {
        parent: optionKey,
        property: optionSingle.property,
        value: optionSingle.value,
        label: `${optionSingle.property}: ${optionSingle.value} in ${optionKey}`,
      };
    });
    return stoneOptions; // options for each stone are nested in this array
  });

  let optionsFlat = []; // we need to flatten the nested arrays to single depth
  if (typeof [].flat === "function"){ // use bleeding edge array method if available ;)
    optionsFlat = listOptions.flat();
  } else {
    optionsFlat = listOptions.reduce((acc, val) => acc.concat(val), []); // revert to a conservative approach :)
  }

  optionsFlat = optionsFlat.filter(optionSingle => {
    return optionSingle.value.indexOf(props.input) === 0;
  });

  const renderOptionsElements = () => {
    return optionsFlat.map(stoneOptions => {
      return (
        <li
          value={stoneOptions.label}
          data-values={stoneOptions.data}
          onClick={() => this.optionClickHandler(stoneOptions)}
        >
          {stoneOptions.label}
        </li>
      )
    });
  };

  return (
    <div className="row" id="inputSection">
      <form className="form-inline">
        <div className="form-group">
          {/*<input
            type="text"
            value={props.input || ""}
            onChange={this.inputChangeHandler}
            className="form-control"
            id="inputInput"
            placeholder="#INPUT"
          />*/}

          <input
            list="browsers"
            name="browser"
            value={this.inputValue}
            onChange={this.inputChangeHandler}
          />
          <ul id="browsers">
            { renderOptionsElements() }
          </ul>

        </div>
      </form>
    </div>
  );
};

export default inputSection(InputSection);
