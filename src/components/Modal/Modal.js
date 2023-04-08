import React from 'react'
import './Modal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal(props) {

    let closingFunction = props.close ? props.close : () => console.log('Missing closing function for modal')
    let title = props.title? props.title : '';
    let description = props.description? props.description : '';
    return (
        <div className='modal'>
            <div className='modal-container'>
            <button className='modal-close-button' onClick={closingFunction}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3>{title}</h3>
            <p>{description}</p>
            {
                props.children
            }
            </div>
        </div>
    )
}
