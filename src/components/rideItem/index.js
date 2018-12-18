import React from 'react';
import rideItem from './../../hocs/rideItem';

const ICONS_URI = "./icons/";

const RideItem = ({ ...props }) => {

  const value = props.value;
  const arrayIndex = props.arrayIndex;

  const setId = (id) => {
    props.onChange(id);
  };

  const isActive = value.id === props.selection;
  const activeClassname = (isActive) ? "active" : "inactive";
  const isPartOfGroup = arrayIndex > -1;
  const colClasses = (isPartOfGroup) ? "col-sm-6 col-md-3" : "col-sm-6 col-md-4 offset-sm-3 offset-sm-4";
  const className = `ridePane ${colClasses} ${activeClassname}`;
  const styling =  (isActive) ? {"background-color": value.color} : {};

  const timeIcon = ICONS_URI + "ico-03.png";
  const ticketIcon = ICONS_URI + "ico-01.png";

  return (
    <div key={arrayIndex} className={className} style={styling} onClick={() => setId(value.id)} >
      <div className="zoneColor">{value.color}</div>
      <div className="zoneName">{value.type}</div>
      <div className="nameField">{value.id}</div>
      <div className="ticketDetails">
        <div className="returnTime">
          <i><img alt="icon" className="icon" src={timeIcon} /></i>
          {value.shape}
          </div>
        <div className="remainingTickets">
          <i><img alt="icon" className="icon" src={ticketIcon} /></i>
          {value.clarity}
          </div>
      </div>
    </div>
  );
};

export default rideItem(RideItem);
