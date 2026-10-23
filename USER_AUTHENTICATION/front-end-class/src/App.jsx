import React from 'react'
import Register from './Components/Register'
import Login from './Components/Login'
import {Routes , Route} from 'react-router-dom'
const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
    </>
  )
}

export default App