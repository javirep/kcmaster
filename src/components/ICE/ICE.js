import React from 'react';



import { useChems, useChemsUpdate, useKc, useKcUpdate, useQuotient, useQuotientUpdate } from '../../context/ChemContext'
import './ICE.css'

export default function ICE(props) {
    const chems = useChems()
    const setChems = useChemsUpdate()
    const kc = useKc()
    const setKc = useKcUpdate()
    const setQuotient = useQuotientUpdate()
    const getChemWithEq = props.getChemWithEq

    let initialICE = props.initial

    const sections = [
        {
            title: 'initial',
            defValue: '0'
        }, 
        {
            title: 'change',
            defValue: ''
        },
        {
            title: 'equilibrium',
            defValue: '',
        }
    ]

    if (!chems.reactants.length || !chems.products.length) { return }

    if (!initialICE && !kc){
        let chemWithEq = getChemWithEq()

        if ( chemWithEq ){
            solveICE(chemWithEq)
        }
    }
    
    let table = getICETable()
    

    function getICETable (){
        let counter = 1;

        return ( 
            <table>
            <thead>
                <tr key='row0'>
                    <th key='row0col0' ></th>
                    { chems.reactants.map( chem => {
                        counter ++;
                        return <th key={'row0col' + counter}>{chem.stocNumber != 1 ? chem.stocNumber + ' ' : '' } {chem.htmlName} { ' (' + chem.state + ')'} </th>
                    })}

                    {chems.products.map( (chem, index) => {
                        counter ++;
                        let tdClassName = !index ? 'left-border' : '';

                        return <th key={'row0col' + counter} className={tdClassName} >{chem.stocNumber != 1 ? chem.stocNumber + ' ' : '' } {chem.htmlName} { ' (' + chem.state + ')'} </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {sections.map( section => {
                    counter ++
                    let disabled = (section.title == 'change' || !initialICE) ? true : false

                    return ( <tr key={counter}>
                        <td key={counter}>{section.title}</td>

                        { chems.reactants.map( (chem, index) => {
                            let id = 'reactants--' + index + '--' + section.title;

                            return (
                                <td key={id} id={'cell-'+id}>
                                    <input value={chem[section.title]} disabled={disabled} onChange={(e)=> modifyChem(id, e.currentTarget.value)}></input>
                                </td>
                                )                        

                        })}
                        { chems.products.map( (chem, index) => {
                            let id = 'products--' + index + '--' + section.title

                            let tdClassName = !index ? 'left-border' : '';

                            return (
                            <td key={id} id={'cell-'+id} className={tdClassName} >
                                <input value={chem[section.title]} disabled={disabled} onChange={(e)=> modifyChem(id, e.currentTarget.value)}></input>
                            </td>
                            )
                        })}
                    </tr> )
                })}
            </tbody>
        </table>
        )
    }

    function solveICE (chemWithEqId){
        if(!chemWithEqId){
            chemWithEqId = getChemWithEq()
        }

        if (!chemWithEqId){
            return 
        }

        let [chemType, index] = chemWithEqId.split('--')
        let chemWithEqObj = chems[chemType][index]

        let change = (Number(chemWithEqObj.equilibrium) - Number(chemWithEqObj.initial)) / Number(chemWithEqObj.stocNumber)

        let netChange = change > 0 ? change : change * -1;

        let forwardReaction = true;

        if( (chemType == 'products' && change < 0) || ( chemType == 'reactants' && change > 0 ) ){
            forwardReaction = false
        }

        let newChems = Object.assign({}, chems)

        newChems.reactants.map(chem => {
            chem.change = netChange * Number(chem.stocNumber)

            if ( forwardReaction ) { chem.change *= -1}
            
            if(!chem.equilibrium){
                chem.equilibrium = Number(chem.initial) + chem.change
            }
        })

        newChems.products.map(chem =>{
            chem.change = netChange * Number(chem.stocNumber)

            if ( !forwardReaction ) { chem.change *= -1}

            if (!chem.equilibrium){
                chem.equilibrium = Number(chem.initial) + chem.change
            }
        })

        if(!kc) {
            let newKc = 1;
    
            newChems.products.forEach(chem => {
                if(chem.state != 's'){
                    newKc *= chem.equilibrium ** chem.stocNumber
                }
            })
            newChems.reactants.forEach(chem => {
                if(chem.state != 's'){
                    newKc /= chem.equilibrium ** chem.stocNumber
                }
            })
    
            setKc(newKc)
        }
    }

    function modifyChem (id, value){
        let [chemType, chemIndex, section ] = id.split('--')
        
        let newChems = Object.assign({}, chems)

        if (section == 'equilibrium'){
            newChems.reactants.forEach(chem => {
                chem['equilibrium'] = ''
                chem['change'] = ''
            })
            
            newChems.products.forEach(chem => {
                chem['equilibrium'] = ''
                chem['change'] = ''
            })
            
            setKc(0)
        }

        newChems[chemType][chemIndex][section] = value
        
        setChems (newChems)

        if (section == 'initial'){
            let quotient = 1;
    
            chems.products.forEach(chem => quotient *= chem.initial ** chem.stocNumber)
            chems.reactants.forEach(chem => quotient /= chem.initial ** chem.stocNumber)
    
            setQuotient(quotient)
        }
    }

  return (
    <div>
        <h2>{props.title}</h2> 
        <div className='table-container'>
            {table}
        </div>
    </div>
  )
}

