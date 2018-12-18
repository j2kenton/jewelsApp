import React from 'react';
import rides from './../../hocs/rides';
import RideItem from './../../components/rideItem';

const Rides = ({ ...props }) => {

  const renderRideItems = (props) => {

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
        <RideItem
          value={value}
          arrayIndex={arrayIndex}
          onChange={props.onChange}
        />
      )
    })
  };

  return (
    <div className="row" {...props} >
      { renderRideItems(props) }
    </div>
  );
};

export default rides(Rides);
