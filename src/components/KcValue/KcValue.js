import React from 'react'

import {useKc } from '../../context/ChemContext'

export default function KcValue() {
    const kc = useKc()
    
    if (!kc) { return }

    return (
        <>
            <h2>K<sub>c</sub> Value</h2>
            <p>K<sub>c</sub> = {kc}</p>
        </>
    )
}
