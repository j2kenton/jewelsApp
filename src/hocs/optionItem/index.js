import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps) {
      const isOptionValid = typeof nextProps.stoneOptions.label === "string";
      const isOptionChanged = (this.props.stoneOptions.label !== nextProps.stoneOptions.label);
      return isOptionValid && isOptionChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  };
}
