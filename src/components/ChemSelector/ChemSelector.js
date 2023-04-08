import React from 'react'
import AddButton from '../AddButton/AddButton'
import Chemical from '../Chemical/Chemical'

import { useChems, useChemsUpdate } from '../../context/ChemContext'

export default function ChemSelector(props) {
    const chemType = props.type
    const chems = useChems()
    const setChems = useChemsUpdate()

    const defaultChem = {
        name:'H2O',
        stocNumber:1,
        state: 'aq', 
        initial:0,
        equilibrium: 0, 
        htmlName: <></>
    }

    function addChem (newChem) {
        let chemsCopy = Object.assign({}, chems)
        newChem.htmlName = getHtmlName(newChem.name)
        chemsCopy[chemType].push(newChem)
        setChems (chemsCopy)
    }

    function modifyChem (id, value){
        let [index, key] = id.split('--')
        let newChems = Object.assign({}, chems)
        newChems[chemType][index][key] = value;
        
        if(key == 'name' ){
            newChems[chemType][index]['htmlName'] = getHtmlName(value)
        }
         
        setChems (newChems)
    }

    function removeChem(index){
        let newChems = Object.assign({}, chems)
        newChems[chemType].splice(index, 1)
        setChems (newChems)
    }

    function getHtmlName (name){
        
        return <p>
            {
                name.split('').map( char =>{
                    if(Number(char)){ return <sub>{char}</sub>}
                    else {return char}
                })
            }
            </p>
    }

    function capFirst ( string ){
        return  string.charAt(0).toLocaleUpperCase() + string.slice(1)
    }

  return (
    <div className='chemSeletor-container'>
        <h2> {capFirst(chemType)} </h2>
        {
            chems[chemType].length ? 
            (
                chems[chemType].map( (chem, index) => <Chemical key={index} index={index} name={chem.name} stockNumber={chem.stockNumber} state={chem.state} modifyChem={modifyChem} removeChem={removeChem}></Chemical>)
            )
            :
            null
        }
        <AddButton  click={ (e)=> addChem (defaultChem) } ></AddButton>
    </div>
  )
}
