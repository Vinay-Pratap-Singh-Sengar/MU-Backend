import React, { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);

    let color;
    if(count < 0){
        color = "red";
    }
    else if(count > 0){
        color="green";
    }
    else{
        color = "blue";
    }

    const decrement = () =>{
        setCount(count-1);
    }

    const reset = () =>{
        setCount(0)
    }

    const increment = () =>{
        setCount(count+1)
    }
  return (
    <div>
        <h1 style={{color : color}}>{count}</h1>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
    </div>
  )
}

export default Counter