import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isInputValid = (typeof nextProps.input === "string");
      const isInputChanged = (this.props.input !== nextProps.input);
      const isStoneTypeValid = (typeof nextProps.stoneType === "string");
      const isStoneTypeChanged = (this.props.stoneType !== nextProps.stoneType);
      return isInputValid && isStoneTypeValid && (isInputChanged || isStoneTypeChanged);
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
