import React from 'react'

import { useQuotient } from '../../context/ChemContext'

export default function QuotieintValue() {
  return (
        <>
            <h2>Quotient Value</h2>
            <p>Q = {useQuotient()}</p>
        </>
  )
}
