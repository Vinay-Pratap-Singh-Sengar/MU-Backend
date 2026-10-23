import React from 'react'
import { useAuth } from '../Context/AuthContext'

const Login = () => {

  const { loginData, setLoginData, login } = useAuth();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await login();

    alert("login successfuly")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' placeholder='enter your email : ' value={loginData.email} onChange={handleChange} />
        <br /><br />
        <input type="password" name='password' placeholder='enter your password : ' value={loginData.password} onChange={handleChange} />
        <br /><br />
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login