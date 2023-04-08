import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Chemical(props) {

    let [name, setName]= useState(props.name ? props.name : 'H2O')
    let [stocNumber, setStocNumber] = useState(props.stocNumber ? props.stocNumber : 1);
    let [state, setState] = useState(props.state? props.state : 'aq');

    let onChangeHandler = (e, key) => {
        if (key == 'stocNumber' ) {
            if (Number(e.currentTarget.value) === NaN || e.currentTarget.value < 1) { return }
            setStocNumber (e.currentTarget.value)
            
        } 
        else if (key == 'name'){
            setName (e.currentTarget.value)
        }
        else if ( key == 'state'){
            setState(e.currentTarget.value)
        }

        props.modifyChem(props.index + '--' + key, e.currentTarget.value)
    }


  return (
    <div>
        <input type='number' value={stocNumber} onChange={(e) => onChangeHandler(e, 'stocNumber')}/>
        <input type='text' value={name} onChange={(e) => onChangeHandler(e, 'name')}/>
        <select value={state} onChange={(e)=> onChangeHandler(e, 'state')}>
            <option value='s'>Solid</option>
            <option value='aq'>Aqueous</option>
            <option value='l'>Liquid</option>
            <option value='g'>Gas</option>
        </select>
        <button onClick={(e) => props.removeChem(props.index)}> <FontAwesomeIcon icon={faTrashCan} /> </button>
    </div>
  )
}
