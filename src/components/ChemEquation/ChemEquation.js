import React from 'react'

import { useChems } from '../../context/ChemContext'
import './ChemEquation.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ChemEquation() {

    const chems = useChems()

    const chemEq = createChemEquation();

    function createChemEquation () {
        return <p>
            {
                chems.reactants.map ( (reactant, index) => {
                    let pre = ''
                    if ( index ) { pre = ' + ' };
                    if (reactant.stocNumber != 1) {  pre += reactant.stocNumber + ' ' }
                    
                    return <>{pre} {reactant.htmlName} {' (' + reactant.state + ') '}</>
                })
            }
             <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            {
                chems.products.map ( (product, index) => {
                    let pre = ' ';
                    if ( index ) { pre = ' + ' };
                    if (product.stocNumber != 1) {  pre += product.stocNumber  }
                    return <>{pre} {product.htmlName } { ' (' + product.state + ')'}</>
                })
            }
            </p>
    }

    return (
        <>
        {
            chemEq ? (
                <> 
                    <h2>Chemical Equation</h2>
                    {chemEq}
                </>
            )
            :
            null
        }
        </>
    )
}
