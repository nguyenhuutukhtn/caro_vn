import React from 'react';

export default function Square(props) {
  const { value,isHighlight } = props;
  return (
    <button className={isHighlight ? 'square square-highlight' : 'square'} type="button" onClick={() => props.onClick()}>
      {value}
    </button>
  );
}