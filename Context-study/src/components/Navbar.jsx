import React from 'react'
import { useUser } from '../context/userContext'

function Navbar() {
    const {name} = useUser();
  return (
    <div>your name is : {name}</div>
  )
}

export default Navbar