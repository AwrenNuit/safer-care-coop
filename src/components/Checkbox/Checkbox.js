import React from 'react';

export default function Checkbox(props) {

  return(
    <div>
      <label>
        <input type="checkbox" onChange={e => props.setting(e.target.checked)} />
        {props.label}
      </label>
    </div>
  );
}