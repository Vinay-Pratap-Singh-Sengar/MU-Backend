import React, { useState } from 'react'

function UseState() {
    // let age = 23;
    const [age, setAge] = useState(23)
    // const handleClick(){
    //     age = 24;
    // }
    const handleClick = () =>{
        setAge(24);
    }

  return (
    <>
        <h1 onClick={handleClick}>{age}</h1>
    </>
  )
}

export default UseState;