import React, { Component } from 'react';

export default function rides(WrappedComponent) {
  return class extends Component {

    static displayName = `Rides(${WrappedComponent.name})`;

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
