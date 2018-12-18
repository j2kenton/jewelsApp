import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isInputValid = Number.isInteger(nextProps.input);
      const isInputChanged = (this.props.input !== nextProps.input);
      return isInputValid && isInputChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
