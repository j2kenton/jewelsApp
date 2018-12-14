import React from 'react';
import pinSection from './../../hocs/pinSection';
// import Slide from './../slide';

// const SCROLL_INTERVAL = 10000;
// const SCROLL_INCREMENT = 1;

const PinSection = ({ ...props }) => {

  this.submitHandler = (e) => {
    e.preventDefault();
    props.submissionHandler();
  };

  this.pinChangeHandler = (e) => {
    const newPin = e.target.value;
    props.onChange(newPin);
  };

  return (
    <div className="pinSection" >
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            value={props.pin}
            onChange={this.pinChangeHandler}
            className="form-control"
            id="inputPin"
            placeholder="Pin"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          onClick={this.submitHandler}
        >SUBMIT</button>
      </form>
    </div>
  );
};

PinSection.contextTypes = {
};

export default pinSection(PinSection);
