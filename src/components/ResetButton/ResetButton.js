import React from 'react'

import { useChemsUpdate, useKcUpdate } from '../../context/ChemContext'

export default function ResetButton() {

    let setKc = useKcUpdate()
    let setChems = useChemsUpdate()

    function reset (){
        setKc(0);
        setChems({
            reactants: [],
            products:[]
        })
    }

  return (
    <button onClick={reset}>Restart</button>
  )
}
