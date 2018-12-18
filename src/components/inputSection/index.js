import React from 'react';
import inputSection from '../../hocs/inputSection';
// import Slide from './../slide';

const InputSection = ({ ...props }) => {

  this.inputChangeHandler = (e) => {
    const newInput = e.target.value;
    props.onChange(newInput);
  };

  return (
    <div className="row" id="inputSection">
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            value={props.input || ""}
            onChange={this.inputChangeHandler}
            className="form-control"
            id="inputInput"
            placeholder="#INPUT"
          />
        </div>
      </form>
    </div>
  );
};

export default inputSection(InputSection);
