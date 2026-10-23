import React from 'react'
import { useUser } from '../context/userContext';

function UserProfile() {
    const {name, setName} = useUser();
  return (
    <>
        <h1>your name is : {name}</h1>
        <button onClick={()=>setName("Ashish")}>changeName</button>
    </>

  )
}

export default UserProfile