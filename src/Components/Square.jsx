import React from 'react';

export default function Square(props) {
  const { value } = props;
  return (
    <button className="square" type="button" onClick={() => props.onClick()}>
      {value}
    </button>
  );
}