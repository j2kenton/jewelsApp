import React from 'react';
import inputSection from '../../hocs/inputSection';
import RideItem from "../rideItem";

const InputSection = ({ ...props }) => {

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

  let listOptions = Object.entries(dataSet).map(entry => {
    const optionKey = entry[0];
    const optionValue = entry[1];
    const stoneOptions = optionValue.map(optionSingle => {
      return {
        parent: optionKey,
        data: optionSingle,
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

  const renderOptionsElements = () => {
    return optionsFlat.map(stoneOptions => {
      return (
        <option value={stoneOptions.label}/>
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

          <input list="browsers" name="browser" />
          <datalist id="browsers">
            { renderOptionsElements() }
          </datalist>

        </div>
      </form>
    </div>
  );
};

export default inputSection(InputSection);
