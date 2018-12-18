import React, { Component } from 'react';

export default function stones(WrappedComponent) {
  return class extends Component {

    static displayName = `Stones(${WrappedComponent.name})`;

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isInputValid = (typeof nextProps.input === "string");
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
