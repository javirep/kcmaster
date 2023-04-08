import React from 'react';
import { useState } from 'react';

export default function DynamicTd(props) {
  
  let defValue = props.defValue
  if ( defValue === false ) { defValue = ''}
  let [value, setValue] = useState( defValue )

    function onChangeHandler (e) {
      setValue(e.currentTarget.value)

      if (props.onChange){
        props.onChange(props.id, e.currentTarget.value)
      }
    }

  return (
    <td key={props.id} id={'cell-'+props.id}>
      <input value={value} disabled={props.disabled} onChange={(e)=> onChangeHandler(e)}></input>
    </td>
  )
}
