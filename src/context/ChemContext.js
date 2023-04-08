import React, {useContext, useState} from 'react'

const ChemContext = React.createContext()
const UpdateChemContext = React.createContext()

const KcContext = React.createContext()
const UpdateKcContext = React.createContext()

const QuotientContext = React.createContext()
const UpdateQuotientContext = React.createContext()

export function useChems () {
    return useContext (ChemContext)
}

export function useChemsUpdate (){
    return useContext(UpdateChemContext)
}

export function useKc () {
    return useContext (KcContext)
}

export function useKcUpdate () {
    return useContext (UpdateKcContext)
}

export function useQuotient () {
    return useContext (QuotientContext)
}

export function useQuotientUpdate () {
    return useContext (UpdateQuotientContext)
}


export function ChemsProvider( {children} ) {

    const [chems, setChems] = useState ({
        reactants: [],
        products:[]
    })

    const [kc, setKc] = useState(0)
    const [quotient, setQuotient] = useState(0)

    return (
        <ChemContext.Provider value={chems}>
            <UpdateChemContext.Provider value={setChems}>

                <KcContext.Provider value={kc}>
                    <UpdateKcContext.Provider value={setKc}>

                        <QuotientContext.Provider value={quotient}>
                            <UpdateQuotientContext.Provider value={setQuotient}>
                                {children}  
                            </UpdateQuotientContext.Provider>
                        </QuotientContext.Provider>

                    </UpdateKcContext.Provider>
                </KcContext.Provider>

            </UpdateChemContext.Provider>
        </ChemContext.Provider>
    )
}
