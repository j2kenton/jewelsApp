import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {
    static contextTypes = {
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isInputValid = (typeof nextProps.input === "string");
      const isInputChanged = (this.props.input !== nextProps.input);
      const isValidChanged = (this.props.isInputValid !== nextProps.isInputValid);
      return isInputValid && (isInputChanged || isValidChanged);
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
