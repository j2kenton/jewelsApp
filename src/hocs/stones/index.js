import React, { Component } from 'react';

export default function stones(WrappedComponent) {
  return class extends Component {

    static displayName = `Stones(${WrappedComponent.name})`;

    shouldComponentUpdate(nextProps) {
      const isSelectionValid = (typeof nextProps.selection === "object");
      const isSelectionChanged = (this.props.selection !== nextProps.selection);
      return isSelectionValid && isSelectionChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  };
}
