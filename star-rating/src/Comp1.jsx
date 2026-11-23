import React from 'react'
import Comp2 from './Comp2'

function Comp1() {
    let name = "vinay"
  return (
    <div>
        <Comp2 name={name}/>
    </div>
  )
}

export default Comp1