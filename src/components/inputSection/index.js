import React from 'react';
import inputSection from '../../hocs/inputSection';
// import Slide from './../slide';

const InputSection = ({ ...props }) => {

  this.submitHandler = (e) => {
    e.preventDefault();
    props.submissionHandler();
  };

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
            value={props.input}
            onChange={this.inputChangeHandler}
            className="form-control"
            id="inputInput"
            placeholder="#INPUT"
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn"
            onClick={this.submitHandler}
            disabled={!props.isInputValid}
          >SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

InputSection.contextTypes = {
};

export default inputSection(InputSection);
