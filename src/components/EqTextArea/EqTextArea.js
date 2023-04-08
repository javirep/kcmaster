import React from 'react'
import './EqTextArea.css'

export default function EqTextArea(props) {
    let text = props.children ? props.children : '';
    
    const operatorSigns = ['+','-','*','/'];
    const equalSign = ['=']
    const signs = ['+', '-']

    let skipNextIndex = false;
    let skipToIndex = false;

    let html = text.split('').map((char, index)=>{

        function getNextGivenCharIndex (char) {
            let counter = 1;
            let condition = 'char == text.charAt(counter + index)'

            if ( char == 'not number'){
                condition = '(text.charAt(counter + index)!= 0 && !Number(text.charAt(counter + index)))'
            }

            for(counter = 1; counter < text.length - index; counter++){
                if (eval(condition)){
                    return counter + index;
                }
            }
            return undefined
        }
        function getPrevGivenCharIndex (char){
            
        }

        if( skipNextIndex == true ){ 
            skipNextIndex = false
            return 
        }
        if (skipToIndex && skipToIndex > index) { return }

        if( char == '^'){

            if (text.charAt( index + 1 ) == '('){
                let closingParenthesisIndex = getNextGivenCharIndex(')')
                skipToIndex = closingParenthesisIndex;
                return <sup>{text.substring(index + 1, closingParenthesisIndex)}</sup>
            }
            else if( Number(text.charAt(index + 1)) ){
                let notNumberIndex = getNextGivenCharIndex('not number')
                
                skipToIndex = notNumberIndex;
                return <sup>{text.substring(index + 1, notNumberIndex)}</sup>
            }

            /* else */
            skipNextIndex = true;
            return <sup>{text.charAt(index + 1)}</sup>
        }
        if (equalSign.includes(char)){
            return <>{' = '}</>
        }
        if (operatorSigns.includes(char)){
            if( text.charAt( index - 1) == '(') { return <></> }
            else if( text.charAt( index + 1) == ')') { return <></>}
        }
        

        return <>{char}</>
    })
  return (
    <div className='eqTextArea'>
        {html}
    </div>
  )
}
