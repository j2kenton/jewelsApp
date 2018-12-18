import React from 'react';
import stones from '../../hocs/stones';
import StoneItem from './../../components/stoneItem';

const Stones = ({ ...props }) => {

  const renderStoneItems = (props) => {

    const stoneFilter = (stone) => {
      if (typeof stone.type !== "string" || typeof props.input !== "string"){
        return true;
      }
      const type = stone.type.toLowerCase();
      const input = props.input.toLowerCase();
      return type.indexOf(input) === 0;
    };

    const stonesFiltered = props.data.filter(stoneFilter);

    return stonesFiltered.map((value, arrayIndex) => {
      return (
        <StoneItem
          value={value}
          arrayIndex={arrayIndex}
          onChange={props.onChange}
        />
      )
    })
  };

  return (
    <div className="row" {...props} >
      { renderStoneItems(props) }
    </div>
  );
};

export default stones(Stones);
