import React from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


export default function AddButton(props) {
    let text = props.text ? props.text : 
    (
      <FontAwesomeIcon icon={faCirclePlus} />
    );

    let clickFunction = props.click ? props.click : function (e) {console.log( 'no click function passed' )};

  return (
    <button className= 'big' onClick={e=> clickFunction(e)}> {text} </button>
  )
}
