import React from 'react';
import stones from '../../hocs/stones';
import StoneItem from './../../components/stoneItem';

const Stones = ({ ...props }) => {

  const renderStoneItems = (props) => {

    const stoneFilter = (stone) => {
      if (typeof props.selection !== "object" || typeof props.selection.parent !== "string"){
        return true;
      }
      const key = props.selection.property;
      const value = props.selection.value;
      const stoneType = props.selection.parent;
      return (stone.type === stoneType) && (stone[key] === value);
    };

    const stonesFiltered = props.data.filter(stoneFilter);

    return stonesFiltered.map((value, arrayIndex) => {
      return (
        <StoneItem
          value={value}
          key={arrayIndex}
        />
      )
    })

  };

  return (
    <div className="row" id="stonesSection">
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Stone</th>
          <th>Shape</th>
          <th>Clarity</th>
          <th>Color</th>
        </tr>
        </thead>
        <tbody>
        { renderStoneItems(props) }
        </tbody>
      </table>
    </div>
  );

};

export default stones(Stones);
