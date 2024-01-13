import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');

  const verify = async () =>{
    try {
      if(username === 'admin' && password === 'admin'){
        navigate("/Admin")
      }else{
        await axios.post("/Login", {username, password})
        navigate("/Info")
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.log(err)
    }
  }
  const nav =()=>{
    navigate('/Signup')
  }
  return (
    <>
    <div className='navbar'>
        <h1>
          Login 
        </h1>

      </div>
      <hr></hr>
    <div className='login'>
      <p style={{color: 'red'}}>{error}</p>
      
      <input value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
      <br/>
      <input value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
      <br/>
      
      <button className='log' onClick={verify}>Login</button>
      <br/>
      <button className='sign' onClick={nav}>Sign Up</button>
    </div>
    </>
  )
}

export default Login