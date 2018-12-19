import React from 'react';
import optionItem from './../../hocs/optionItem';
import MaterialIcon from "material-icons-react";

const OptionItem = ({ ...props }) => {

  return (
    <li
      className="option optionItem"
      value={props.stoneOptions.label}
      onClick={() => props.optionClickHandler(props.stoneOptions)}
    >
      <MaterialIcon icon={props.icon} invert className="option" />
      <span className="option">{props.stoneOptions.label}</span>
    </li>
  );

};

export default optionItem(OptionItem);
