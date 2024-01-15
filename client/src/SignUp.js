import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function SignUp () {
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const register = async () =>{
    try {
      if(username === 'admin' || password === 'admin'){
        setError('Invalid email or password. Please try again.');
      }else{
        axios.post("/signup", {username, password}).then(() => {
          navigate('/Info'); 
        })
        .catch(err => {
          setError('Username not available. Please try a different one')
          console.log(err);
        });
        
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
    <div className='navbar'>
        <h1>
          Register 
        </h1>
        
    </div>
    <hr></hr>
    <div className='login'>
      <p style={{color: 'red'}}>{error}</p>
      <input value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
      <br/>
      <input value={password} type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
      <br />
      <button className='sign' onClick={register}>Sign Up</button>
    </div>
    </>
  )
}

export default SignUp