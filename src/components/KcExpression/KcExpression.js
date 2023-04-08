import React, {useState}  from 'react'
import './KcExpression.css'
import Modal from '../Modal/Modal'

import { useChems, useChemsUpdate, useKc, useKcUpdate, useQuotient } from '../../context/ChemContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import EqTextArea from '../EqTextArea/EqTextArea';


export default function KcExpression() {

  const chems = useChems()
  const setChems = useChemsUpdate()
  const setKcContext = useKcUpdate ();
  const quotient = useQuotient();

  let [change, setChange] = useState(0)
  let [displayChangeModal, setdisplayChangeModal] = useState(false)
  let [kc, setKc] = useState(useKc())

  let forwardReaction = quotient < kc

  function kcHandler (value) {
    setKc(value)
    setKcContext(Number(value))
  }

  if (!chems.reactants.length || !chems.products.length) { return }

  let showInput = true;
  let showDenominator = false;

  chems.reactants.forEach( chem => chem.equilibrium ? showInput = false : null)
  chems.products.forEach( chem => chem.equilibrium ? showInput = false : null)

  let numerator = chems.products.map((chem, index) => {
    if(chem.state == 's'){ return <></>}
    let multSign = index ? ' · ' :  '';
    let exponent = chem.stocNumber != 1 ? <sup>{chem.stocNumber}</sup> : ''
    return <span>{multSign} [ {chem.htmlName} ] {exponent} </span>
})

  let denominator = chems.reactants.map((chem, index) => {
    if(chem.state == 's'){ return null}
    showDenominator = true
    let multSign = index ? ' · ' :  '';
    let exponent = chem.stocNumber != 1 ? <sup>{chem.stocNumber}</sup> : ''
    return <span>{multSign} [ {chem.htmlName} ] {exponent}</span>
})

  function getEquation (){
    let equation = kc + '=('

    chems.products.forEach(chem =>{
      let sign = forwardReaction ? '+' : '-'
      equation += '(';
      if (chem.initial) { equation += chem.initial }
      equation += sign + chem.stocNumber + 'x)^' + chem.stocNumber 
    })

    equation += ')/('

    chems.reactants.forEach(chem =>{
      let sign = forwardReaction ? '-' : '+'
      equation += '(';
      if (chem.initial) { equation += chem.initial }
      equation += sign + chem.stocNumber + 'x^' + chem.stocNumber 
    })

    equation +=')'

    return equation
  }

  async function  solveICEwKc (){

    if( quotient > kc){
        forwardReaction = false
    }
    
    let equation= getEquation();

    setdisplayChangeModal(true)
  }

  function changeHandler (newChange){
    setChange(newChange)
  }

  function acceptChange (){
    let newChems = Object.assign({}, chems)

    forwardReaction = quotient < kc

    newChems.reactants.map(chem=>{
      chem.change = change * Number(chem.stocNumber)

      if ( forwardReaction ) { chem.change *= -1}
      
      if(!chem.equilibrium){
          chem.equilibrium = Number(chem.initial) + chem.change
      }
    })

    newChems.products.map(chem =>{
      chem.change = change * Number(chem.stocNumber)

      if ( !forwardReaction ) { chem.change *= -1}
      
      if(!chem.equilibrium){
          chem.equilibrium = Number(chem.initial) + chem.change
      }
    })

    setdisplayChangeModal(false)

    setChems(newChems)

  }

  function cancelCange (){
    setdisplayChangeModal(false)
  }

  let changeInput = <input value={change} onChange={(e)=>changeHandler(e.currentTarget.value)} ></input>
  let title = 'Insert Result'
  let description = 'Please, solve for x in the following equation and input the result';

  let wolprhamAlphaButton = <button><a href={'http://api.wolframalpha.com/v1/simple?appid=YEU5E6-JXHX24R27T&i=solve' + getEquation()} target='_blank'>Solve with Wolprham Alpha</a></button>

  let acceptChangeButton = <button onClick={() => {acceptChange()}}>
    <FontAwesomeIcon icon={faRightToBracket} />  
  </button>

  return (
    <>
    <h2>K<sub>c</sub> Expression</h2>
    <div className='formula-container'>
      <span> K<sub>c</sub> = </span>
      <span className='fraction'>
        <span className='numerator'>{numerator}</span>
        {
          showDenominator ? 
            <span className='denominator'>{denominator}</span>
          :
          null
        }
      </span>
      {
        showInput ? (
        <>
          <span> = <input value={kc} onChange={(e)=>kcHandler(e.currentTarget.value)}></input></span>
          {
            kc ? (
              <button onClick={solveICEwKc}> Apply Kc </button>
            )
            : null
          }
          
        </>
        )
        :
        null
      }
    </div>

    {
      displayChangeModal ? 
      <Modal close={()=>{cancelCange()}} description={description} title={title}>
        <EqTextArea>{getEquation()}</EqTextArea>
        <div>
          {wolprhamAlphaButton}
          {changeInput}
          {acceptChangeButton}
        </div>
      </Modal>
      : 
      null
    }
    </>
  )
}
