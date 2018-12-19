import React, { Component } from 'react';

export default function appComponent(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps) {
      const isInputValid = Number.isInteger(nextProps.value.id);
      const isInputChanged = (this.props.value.id !== nextProps.value.id);
      return isInputValid && isInputChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  };
}
