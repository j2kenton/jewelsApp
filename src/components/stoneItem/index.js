import React from 'react';
import stoneItem from './../../hocs/stoneItem';

const StoneItem = ({ ...props }) => {

  const value = props.value;
  const arrayIndex = props.key;

  const setId = (id) => {
    props.onChange(id);
  };

  return (
    <tr key={arrayIndex} onClick={() => setId(value.id)} >
      <td>{value.id}</td>
      <td>{value.type}</td>
      <td>{value.shape}</td>
      <td>{value.clarity}</td>
      <td>{value.color || "-"}</td>
    </tr>
  );
};

export default stoneItem(StoneItem);
