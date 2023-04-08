
import './App.css';
import ChemSelector from './components/ChemSelector/ChemSelector';
import ChemEquation from './components/ChemEquation/ChemEquation';
import ICE from './components/ICE/ICE';
import KcExpression from './components/KcExpression/KcExpression';
import KcValue from './components/KcValue/KcValue';
import ResetButton from './components/ResetButton/ResetButton';
import QuotieintValue from './components/QuotientValue/QuotieintValue';

import { useChems, useKc, useQuotient } from './context/ChemContext'


function App() {

  const chems = useChems()
  const kc = useKc()
  const quotient = useQuotient()

  function getChemWithEq (){
    let chemWithEq = false

    chems['products'].forEach( (chem, index) => {
        if( chem.equilibrium ){
            chemWithEq = 'products--' + index
        }
    })

    if (!chemWithEq){
        chems['reactants'].forEach( (chem, index) => {
            if( chem.equilibrium ){
                chemWithEq = 'reactants--' + index
            }
        })
    }

    return chemWithEq
  } 

  const showChemEquation = (chems.reactants.length && chems.products.length)
  const showInitialICE = (chems.reactants.length && chems.products.length)
  const showKCExpression = (chems.reactants.length && chems.products.length)
  const showQuotient = (chems.reactants.length && chems.products.length && quotient != 0)

  const chemWithEq = getChemWithEq()

  const showFinalICE = (chemWithEq || kc);
  const showKcValue = (chemWithEq || kc);

  return (
    <div className="App">
      <script src='./js/basicFunction.js'></script>
      <h1 className='main-title'> Welcome to Kc Master</h1>

        
          <div className='main'>

              <div className='col'>
                <ChemSelector type="reactants"></ChemSelector>
                <ChemSelector type="products"></ChemSelector>
                {
                  showChemEquation ? 
                  <ChemEquation ></ChemEquation> : null
                }
              </div>

              <div className='col'>
                {
                   showInitialICE ?
                   (<ICE title='Initial ICE' initial={true} getChemWithEq={getChemWithEq}></ICE>) : (null) 
                }{
                  showKCExpression ?
                    <KcExpression></KcExpression> : null
                }{
                  showQuotient ?
                  <QuotieintValue></QuotieintValue> : null
                }
              </div>

              <div className='col'> 
              {
                showFinalICE ? 
                <ICE title='Final ICE' initial={false} getChemWithEq={getChemWithEq}></ICE> : null
              }{
                showKcValue ? 
                <KcValue></KcValue> : null
              }
              
              </div>

          </div>
          <div>
            <ResetButton></ResetButton>
          </div>
    </div>
  );
}

export default App;
